import type { ConfigurationOptions } from '@c8y/devkit';
import { gettext } from '@c8y/ngx-components/gettext';
import { author, description, license, name, version } from './package.json';

const defaultDescription = gettext(
  'The Device Management application provides functionalities for managing and monitoring devices and enables you to control and troubleshoot devices remotely.'
);

export default {
  runTime: {
    author,
    description: description || defaultDescription,
    version,
    name,
    globalTitle: 'Cumulocity',
    rightDrawer: true,
    breadcrumbs: false,
    sensorAppOneLink: 'http://onelink.to/pca6qe',
    sensorPhone: true,
    contentSecurityPolicy:
      "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' http: https: ws: wss:;  script-src 'self' *.bugherd.com *.twitter.com *.twimg.com *.aptrinsic.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data: blob:; font-src * data:; frame-src *; worker-src 'self' blob:;",
    dynamicOptionsUrl: true,
    contextHelp: true,
    license,
    upgrade: true,
    exports: [
      {
        name: 'Replace device plugin',
        module: 'ReplaceDeviceModule',
        path: '@c8y/ngx-components/replace-device',
        description:
          'Replace device plugin for enabling the action of replacing a physical device with another one.',
        scope: 'self'
      },
      {
        name: 'Services plugin',
        module: 'ServicesModule',
        path: '@c8y/ngx-components/services',
        description:
          'The Services plugin provides a device tab that lists all services running on a device with their status, name, type and date of the last update.',
        scope: 'self'
      },
      {
        name: 'Remote access: Configuration list',
        module: 'remoteAccessConfigurationListProviders',
        path: '@c8y/ngx-components/remote-access/configurations',
        description:
          'Allows to configure remote access on devices and to initiate the remote access connections.',
        scope: 'self'
      },
      {
        name: 'Remote access: VNC protocol support',
        module: 'remoteAccessVNCProviders',
        path: '@c8y/ngx-components/remote-access/vnc',
        description: 'Adds VNC protocol support to the remote access feature.',
        scope: 'self'
      },
      {
        name: 'Remote access: SSH protocol support',
        module: 'remoteAccessSSHProviders',
        path: '@c8y/ngx-components/remote-access/ssh',
        description: 'Adds SSH protocol support to the remote access feature.',
        scope: 'self'
      },
      {
        name: 'Remote access: Telnet protocol support',
        module: 'remoteAccessTelnetProviders',
        path: '@c8y/ngx-components/remote-access/telnet',
        description: 'Adds Telnet protocol support to the remote access feature.',
        scope: 'self'
      },
      {
        name: 'Remote access: Passthrough protocol support',
        module: 'remoteAccessPassthroughProviders',
        path: '@c8y/ngx-components/remote-access/passthrough',
        description: 'Adds passthrough support to the remote access feature.',
        scope: 'self'
      },
      {
        name: 'Data point explorer',
        module: 'dataExplorerMeasurementsFeature',
        path: '@c8y/ngx-components/datapoint-explorer/devicemanagement',
        description: 'Enables visualization of data points',
        scope: 'self'
      },
      {
        name: 'Dashboard manager',
        module: 'dashboardManagerFeatureProvider',
        path: '@c8y/ngx-components/dashboard-manager/devicemanagement',
        description:
          'Adds Dashboard manager as Management feature and allows to manage type dashboards.',
        scope: 'self'
      },
      {
        name: 'Sensor phone',
        module: 'SensorPhoneModule',
        path: '@c8y/ngx-components/sensor-phone',
        description: 'Dialogs to connect smartphone to platform.',
        scope: 'self'
      }
    ],
    remotes: {
      [`lwm2m-ui-plugin@${version.split('.')[0]}-stable`]: ['Lwm2mModuleWrapper'],
      ['c8y-asm-ui@latest']: ['AdvancedSoftwareModule'],
      [`smart-rules@${version.split('.')[0]}-stable`]: ['AnalyticsInstanceModule'],
      [`device-parameters-ui-plugin@${version.split('.')[0]}-stable`]: [
        'deviceParametersFeatureProvider'
      ]
    }
  },
  buildTime: {
    federation: [
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/upgrade',
      '@c8y/client',
      '@c8y/ngx-components',
      'angular',
      'ngx-bootstrap',
      '@ngx-translate/core',
      '@ngx-formly/core'
    ]
  }
} as const satisfies ConfigurationOptions;
