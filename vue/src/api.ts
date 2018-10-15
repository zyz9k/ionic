import { VueConstructor } from 'vue/types';
import { Delegate } from './framework-delegate';
import { ProxyController } from './proxy-controller';
import { ProxyMenuController } from './proxy-menu-controller';
import { ProxyDelegateController } from './proxy-delegate-controller';
import { appInitialize } from './ionic';

let _Vue: VueConstructor;
let _Delegate: Delegate;

export class Ionic {
  static cache: any;
  static install: any;
  // Create or return a ActionSheetController instance
  get actionSheetController() {
    return getOrCreateController('ion-action-sheet-controller');
  }

  // Create or return an AlertController instance
  get alertController() {
    return getOrCreateController('ion-alert-controller');
  }

  // Create or return a LoadingController instance
  get loadingController() {
    return getOrCreateController('ion-loading-controller');
  }

  // Create or return a MenuController instance
  get menuController() {
    return getOrCreateMenuController('ion-menu-controller');
  }

  // Create or return a ModalController instance
  get modalController() {
    return getOrCreateDelegatedController('ion-modal-controller');
  }

  // Create or return a PopoverController instance
  get popoverController() {
    return getOrCreateDelegatedController('ion-popover-controller');
  }

  // Create or return a ToastController instance
  get toastController() {
    return getOrCreateController('ion-toast-controller');
  }
}

// Cached controllers
Ionic.cache = {
  'ion-action-sheet-controller': null,
  'ion-alert-controller': null,
  'ion-loading-controller': null,
  'ion-menu-controller': null,
  'ion-modal-controller': null,
  'ion-popover-controller': null,
  'ion-toast-controller': null
};

// tslint:disable-next-line:only-arrow-functions
Ionic.install = function(Vue: VueConstructor) {
  // If installed - skip
  if (Ionic.install.installed && _Vue === Vue) return;

  _Vue = Vue;
  _Delegate = new Delegate(Vue);
  Ionic.install.installed = true;

  // Ignore Ionic custom elements
  Vue.config.ignoredElements.push(/^ion-/);

  const ionicInstance = appInitialize();

  Vue.prototype.$ionic = ionicInstance;

};

// Get existing Base controller instance or initialize a new one
function getOrCreateController(tag: string) {
  if (!Ionic.cache[tag]) {
    Ionic.cache[tag] = new ProxyController(tag);
  }
  return Ionic.cache[tag];
}

// Get existing Menu controller instance or initialize a new one
function getOrCreateMenuController(tag: string) {
  if (!Ionic.cache[tag]) {
    Ionic.cache[tag] = new ProxyMenuController();
  }

  return Ionic.cache[tag];
}

// Get existing Delegated controller instance or initialize a new one
function getOrCreateDelegatedController(tag: string) {
  if (!Ionic.cache[tag]) {
    Ionic.cache[tag] = new ProxyDelegateController(tag, _Delegate);
  }
  return Ionic.cache[tag];
}
