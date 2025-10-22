import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { CoreModule, RouterModule } from '@c8y/ngx-components';
import { ActilityDeviceRegistrationModule } from '@c8y/ngx-components/actility-device-registration';
import { alarmsDeviceManagementRouteAndNodeConfig } from '@c8y/ngx-components/alarms/devicemanagement';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { BinaryFileDownloadModule } from '@c8y/ngx-components/binary-file-download';
import { BookmarksModule } from '@c8y/ngx-components/bookmarks';
import { ChildDevicesModule } from '@c8y/ngx-components/child-devices';
import {
  DeviceInfoDashboardModule,
  DeviceManagementHomeDashboardModule,
} from '@c8y/ngx-components/context-dashboard';
import { DeviceListModule } from '@c8y/ngx-components/device-list';
import { deviceMapFeatureProvider } from '@c8y/ngx-components/device-map';
import { DeviceProfileModule } from '@c8y/ngx-components/device-profile';
import { DeviceProtocolsModule } from '@c8y/ngx-components/device-protocols';
import { DeviceProvisionedCertificatesModule } from '@c8y/ngx-components/device-provisioned-certificates';
import { DeviceShellModule } from '@c8y/ngx-components/device-shell';
import { DiagnosticsModule } from '@c8y/ngx-components/diagnostics';
import {
  AddLocationModule,
  LocationTabModule,
} from '@c8y/ngx-components/location';
import { LoriotDeviceRegistrationModule } from '@c8y/ngx-components/loriot-device-registration';
import { OperationsModule } from '@c8y/ngx-components/operations';
import { LpwanProtocolModule } from '@c8y/ngx-components/protocol-lpwan';
import { OpcuaProtocolModule } from '@c8y/ngx-components/protocol-opcua';
import { RegisterDeviceModule } from '@c8y/ngx-components/register-device';
import { RepositoryModule } from '@c8y/ngx-components/repository';
import { SearchModule } from '@c8y/ngx-components/search';
import { SigfoxDeviceRegistrationModule } from '@c8y/ngx-components/sigfox-device-registration';
import { SubAssetsModule } from '@c8y/ngx-components/sub-assets';
import { trackingFeatureProvider } from '@c8y/ngx-components/tracking';
import { TrustedCertificatesModule } from '@c8y/ngx-components/trusted-certificates';
import {
  DashboardUpgradeModule,
  HybridAppModule,
  UPGRADE_ROUTES,
  UpgradeModule,
} from '@c8y/ngx-components/upgrade';
import { cockpitWidgets } from '@c8y/ngx-components/widgets/cockpit';
import { datapointGraphWidgetproviders } from '@c8y/ngx-components/widgets/definitions/datapoints-graph';
import { deviceManagementWidgets } from '@c8y/ngx-components/widgets/device-management';

import { PromoteActionControlsFactory } from './promote-action.factory';
import { hookDataGridActionControls } from '@c8y/ngx-components';

@NgModule({
  imports: [
    // Upgrade module must be the first
    UpgradeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([...UPGRADE_ROUTES]),
    CoreModule.forRoot(),
    AssetsNavigatorModule.config({
      smartGroups: true,
    }),
    OperationsModule,
    OpcuaProtocolModule,
    TrustedCertificatesModule,
    NgUpgradeModule,
    DashboardUpgradeModule,
    RepositoryModule,
    DeviceProfileModule,
    BinaryFileDownloadModule,
    SearchModule,
    LpwanProtocolModule,
    SubAssetsModule,
    ChildDevicesModule,
    DeviceManagementHomeDashboardModule,
    deviceManagementWidgets(),
    cockpitWidgets(['cockpit.welcome.widget', 'Cockpit Welcome']),
    DeviceInfoDashboardModule,
    RegisterDeviceModule,
    SigfoxDeviceRegistrationModule,
    ActilityDeviceRegistrationModule,
    LoriotDeviceRegistrationModule,
    DeviceShellModule,
    DeviceProtocolsModule,
    DiagnosticsModule,
    DeviceListModule,
    BookmarksModule,
    LocationTabModule,
    AddLocationModule,
    DeviceProvisionedCertificatesModule,
    alarmsDeviceManagementRouteAndNodeConfig(),
  ],
  providers: [
    deviceMapFeatureProvider,
    trackingFeatureProvider,
    datapointGraphWidgetproviders,
    hookDataGridActionControls(PromoteActionControlsFactory),
  ],
})
export class AppModule extends HybridAppModule {
  constructor(protected override upgrade: NgUpgradeModule) {
    super();
  }
}
