import { Injectable } from '@angular/core';
import { InventoryService, IManagedObject } from '@c8y/client';
import { TierService } from './tier.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SoftwareDatasource {
  constructor(private inv: InventoryService, private tiers: TierService) {}
  async listForCurrentUser(): Promise<IManagedObject[]> {
    const tier = await firstValueFrom(this.tiers.getUserTier$());
    const res = await this.inv.list({
      pageSize: 200,
      query: '$filter=has(c8y_Software)',
      withTotalPages: true,
    } as any);
    return res.data.filter((mo) => {
      const a = (mo as any).x_approval || {};
      const t = typeof a.currentTier === 'number' ? a.currentTier : 0;
      return t <= tier;
    });
  }
}
