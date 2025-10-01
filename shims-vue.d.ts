import { SnotifyService } from './src/SnotifyService';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $snotify: SnotifyService;
  }
}