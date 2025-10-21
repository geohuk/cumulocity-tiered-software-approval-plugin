import { Component } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';

@Component({
  selector: 'app-add-software-tiered',
  template: ` <c8y-title>Add Software (tiered)</c8y-title>
    <form (ngSubmit)="submit()" #f="ngForm" class="card card--nested p-16">
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" name="name" [(ngModel)]="name" required />
      </div>
      <div class="form-group">
        <label>Version</label>
        <input
          class="form-control"
          name="version"
          [(ngModel)]="version"
          required
        />
      </div>
      <div class="form-group">
        <label>File</label>
        <input
          type="file"
          class="form-control"
          (change)="onFile($event)"
          required
        />
      </div>
      <button
        class="btn btn-primary"
        [disabled]="busy || !file || !name || !version"
      >
        {{ busy ? 'Uploading…' : 'Create' }}
      </button>
    </form>`,
})
export class AddSoftwareTieredComponent {
  name = '';
  version = '';
  file: File | null = null;
  busy = false;
  constructor(private inv: InventoryService, private alert: AlertService) {}
  onFile(e: Event) {
    const i = e.target as HTMLInputElement;
    this.file = i.files?.[0] ?? null;
  }
  async submit() {
    if (!this.file) return;
    this.busy = true;
    try {
      const created: any = await this.inv.create({
        c8y_IsBinary: {},
        c8y_Software: { name: this.name, version: this.version },
        name: `${this.name} ${this.version}`,
        type: 'c8y_SoftwarePackage',
      } as any);
      await this.inv.upload(created, this.file);
      const now = new Date().toISOString();
      await this.inv.update({
        id: created.id,
        x_approval: {
          state: 'draft',
          currentTier: 0,
          history: [{ tier: 0, by: 'ui', at: now, notes: 'Auto-init' }],
        },
      } as any);
      this.alert.success('Software created with approval fragment.');
      history.back();
    } catch (e: any) {
      this.alert.danger('Failed to create software', e?.message || e);
    } finally {
      this.busy = false;
    }
  }
}
