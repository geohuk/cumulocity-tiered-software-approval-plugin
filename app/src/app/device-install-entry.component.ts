import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@c8y/ngx-components';
import { InstallTieredModalComponent } from './install-tiered.modal';

@Component({
  selector: 'app-device-install-tiered',
  template: ` <c8y-title>Install (tiered)</c8y-title>
    <div class="card p-16">
      <p>Open the tier-aware installer.</p>
      <button class="btn btn-primary" (click)="open()">Open Installer</button>
    </div>`,
})
export class DeviceInstallTieredTabComponent {
  deviceId!: string;
  constructor(route: ActivatedRoute, private modal: ModalService) {
    this.deviceId = route.snapshot.paramMap.get('id')!;
  }
  open() {
    const ref = this.modal.open(InstallTieredModalComponent);
    (ref.componentInstance as InstallTieredModalComponent).deviceId =
      this.deviceId;
  }
}
