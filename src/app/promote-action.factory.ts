import { Injectable } from '@angular/core';
import { getCurrentUser } from '@c8y/bootstrap';
import { InventoryService } from '@c8y/client';
import {
  ActionControl,
  ActionControlHook,
  Permissions,
} from '@c8y/ngx-components';

type ApprovalState = 'draft' | 'tier1' | 'tier2' | 'final';

@Injectable({ providedIn: 'root' })
export class PromoteActionControlsFactory {
  constructor(
    private inv: InventoryService,
    private permissions: Permissions
  ) {}

  // The hook must return an *object* with { matchesGrid, actionControls }
  get(): ActionControlHook {
    return {
      // Keep it simple: attach to all grids; we'll gate by item type in showIf
      matchesGrid: () => true,

      // Provide one action control; the grid calls `showIf` per row
      actionControls: this.promoteAction(),
    };
  }

  private promoteAction(): ActionControl {
    return {
      type: 'promote', // custom action id (can be any string)
      icon: 'arrow-up',
      text: 'Promote', // kept generic; visibility drives the step
      // Only show for Software rows and when viewer’s tier matches the next step
      showIf: (item: any) => {
        const isSoftware = !!(
          item?.c8y_Software || item?.type === 'c8y_SoftwarePackage'
        );
        if (!isSoftware) return false;

        const userTier = this.permissions.hasRole('ROLE_TIER3_APPROVER')
          ? 3
          : this.permissions.hasRole('ROLE_TIER2_APPROVER')
          ? 2
          : this.permissions.hasRole('ROLE_TIER1_APPROVER')
          ? 1
          : 0;

        const state: ApprovalState = item?.x_approval?.state || 'draft';
        const nextTier =
          state === 'draft'
            ? 1
            : state === 'tier1'
            ? 2
            : state === 'tier2'
            ? 3
            : null;

        return nextTier !== null && userTier === nextTier;
      },
      // The required executor
      callback: async (item: any, reload?: () => void) => {
        const state: ApprovalState = item?.x_approval?.state || 'draft';
        const nextTier = state === 'draft' ? 1 : state === 'tier1' ? 2 : 3;
        const newState: ApprovalState =
          nextTier === 3 ? 'final' : (`tier${nextTier}` as ApprovalState);

        const now = new Date().toISOString();
        const x = item?.x_approval || { history: [] };
        const updated = {
          ...x,
          state: newState,
          currentTier: nextTier,
          history: [
            ...(x.history || []),
            { tier: nextTier, by: getCurrentUser, at: now },
          ],
        };

        await this.inv.update({ id: item.id, x_approval: updated } as any);
        if (reload) reload();
      },
    };
  }
}
