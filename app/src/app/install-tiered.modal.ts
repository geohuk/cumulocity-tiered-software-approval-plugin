import { Component, Input } from '@angular/core';
import {
  DeviceControlService,
  InventoryService,
  IOperation,
} from '@c8y/client';
import { ModalService, AlertService } from '@c8y/ngx-components';
import { SoftwareDatasource } from './software-datasource';

@Component({
  selector: 'app-install-tiered-modal',
  template: ` <c8y-modal
    [title]="'Install software (tiered)'"
    (onClose)="close()"
  >
    <div class="p-16">
      <p>Select a package. Only <b>final</b> can be installed.</p>
      <div class="form-group">
        <label>Software</label>
        <select class="form-control" [(ngModel)]="selectedId">
          <option
            *ngFor="let sw of software"
            [ngValue]="sw.id"
            [disabled]="(sw as any).x_approval?.state !== 'final'"
          >
            {{ sw.c8y_Software?.name }} {{ sw.c8y_Software?.version }} —
            {{ (sw as any).x_approval?.state || 'draft' }}
          </option>
        </select>
      </div>
    </div>
    <c8y-modal-footer>
      <button class="btn btn-default" (click)="close()">Cancel</button>
      <button
        class="btn btn-primary"
        [disabled]="!selectedId || !isFinal(selectedId)"
        (click)="install()"
      >
        Install
      </button>
    </c8y-modal-footer>
  </c8y-modal>`,
})
export class InstallTieredModalComponent {
  @Input() deviceId!: string;
  software: any[] = [];
  selectedId: string | null = null;
  constructor(
    private modal: ModalService,
    private alert: AlertService,
    private inv: InventoryService,
    private ops: DeviceControlService,
    private ds: SoftwareDatasource
  ) {
    this.load();
  }
  async load() {
    this.software = await this.ds.listForCurrentUser();
  }
  close() {
    this.modal.close();
  }
  isFinal(id: string) {
    const sw = this.software.find((s) => s.id === id);
    return (sw?.x_approval?.state || 'draft') === 'final';
  }
  async install() {
    try {
      const sw = this.software.find((s) => s.id === this.selectedId);
      await this.ops.create({
        deviceId: this.deviceId,
        status: 'PENDING',
        c8y_Software: [
          { name: sw.c8y_Software?.name, version: sw.c8y_Software?.version },
        ],
      } as unknown as IOperation);
      this.alert.success('Operation created.');
      this.close();
    } catch (e: any) {
      this.alert.danger('Failed to create operation', e?.message || e);
    }
  }
}
