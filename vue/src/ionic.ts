// Import type info
import '@ionic/core';

import '@ionic/core/css/ionic.bundle.css';

import 'ionicons/dist/collection/icon/icon.css';

import '@ionic/core/dist/ionic/svg';

import { defineCustomElements } from '@ionic/core/loader';

export const appInitialize = () => defineCustomElements(window);
