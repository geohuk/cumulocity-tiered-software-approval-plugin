import { Injectable } from '@angular/core';
import { UserService } from '@c8y/ngx-components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TierService {
  constructor(private users: UserService) {}
  getUserTier$(): Observable<0 | 1 | 2 | 3> {
    return this.users.current().pipe(
      map((u) => {
        const roles = new Set((u as any)?.roles || []);
        if (roles.has('ROLE_TIER3_APPROVER')) return 3;
        if (roles.has('ROLE_TIER2_APPROVER')) return 2;
        if (roles.has('ROLE_TIER1_APPROVER')) return 1;
        return 0;
      })
    );
  }
}
