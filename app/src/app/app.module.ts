import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as ngRouterModule } from '@angular/router';
import {
  CoreModule,
  BootstrapComponent,
  HOOK_NAVIGATOR_NODES,
  NavigatorNode,
  HOOK_DEVICE_TAB,
} from '@c8y/ngx-components';
import { FormsModule } from '@angular/forms';

import { AddSoftwareTieredComponent } from './add-software-tiered.component';
import { DeviceInstallTieredTabComponent } from './device-install-entry.component';
import { InstallTieredModalComponent } from './install-tiered.modal';
import { PromoteActionFactory } from './promote-action.factory';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(
      [
        { path: 'tiered/add-software', component: AddSoftwareTieredComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ],
      { useHash: true }
    ),
    CoreModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    AddSoftwareTieredComponent,
    DeviceInstallTieredTabComponent,
    InstallTieredModalComponent,
  ],
  bootstrap: [BootstrapComponent],
  providers: [
    PromoteActionFactory,
    {
      provide: HOOK_NAVIGATOR_NODES,
      useValue: [
        new NavigatorNode({
          label: 'Add Software (tiered)',
          path: 'tiered/add-software',
          icon: 'plus-square',
          parent: 'Repository',
        }),
      ],
      multi: true,
    },
    {
      provide: HOOK_DEVICE_TAB,
      useValue: {
        label: 'Install (tiered)',
        priority: 100,
        component: DeviceInstallTieredTabComponent,
        path: 'install-tiered',
      },
      multi: true,
    },
  ],
})
export class AppModule {}
