import { proxyMethod } from './api-utils';

// A proxy class that allows early access to controller methods
export class ProxyController {
  tag: string;
  constructor(tag: string) {
    this.tag = tag;
  }

  create(opts = {}): Promise<any> {
    return proxyMethod(this.tag, 'create', opts);
  }

  dismiss(data?: any, role?: string, id?: string): Promise<void> {
    return proxyMethod(this.tag, 'dismiss', data, role, id);
  }

  getTop(): Promise<any> {
    return proxyMethod(this.tag, 'getTop');
  }
}
