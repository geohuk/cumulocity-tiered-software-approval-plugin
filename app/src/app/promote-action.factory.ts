import { Injectable } from '@angular/core';
import { HookService, HOOK_LIST_ACTIONS, Action } from '@c8y/ngx-components';
import { InventoryService } from '@c8y/client';
import { TierService } from './tier.service';

@Injectable({ providedIn: 'root' })
export class PromoteActionFactory {
  private userTier = 0;
  constructor(
    hooks: HookService,
    tiers: TierService,
    private inv: InventoryService
  ) {
    tiers.getUserTier$().subscribe((t) => (this.userTier = t));
    hooks.register(HOOK_LIST_ACTIONS, {
      priority: 100,
      actionFactory: (ctx) => this.actions(ctx),
    });
  }
  private actions(ctx: { item: any }): Action[] {
    const mo = ctx.item;
    const state = mo?.x_approval?.state || 'draft';
    const nextTier =
      state === 'draft'
        ? 1
        : state === 'tier1'
        ? 2
        : state === 'tier2'
        ? 3
        : null;
    const canPromote = nextTier !== null && this.userTier === nextTier;
    if (!canPromote) return [];
    return [
      {
        label: `Promote to ${nextTier === 3 ? 'final' : `tier${nextTier}`}`,
        icon: 'arrow-up',
        priority: 100,
        callback: async () => {
          const now = new Date().toISOString();
          const x = mo.x_approval || { history: [] };
          const newState =
            nextTier === 1 ? 'tier1' : nextTier === 2 ? 'tier2' : 'final';
          const updated = {
            ...x,
            state: newState,
            currentTier: nextTier,
            history: [
              ...(x.history || []),
              { tier: nextTier, by: 'ui', at: now },
            ],
          };
          await this.inv.update({ id: mo.id, x_approval: updated } as any);
        },
      },
    ];
  }
}
