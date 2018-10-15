import { ProxyController } from './proxy-controller';
import { Delegate } from './framework-delegate';

// A proxy class that allows early access to controller methods
export class ProxyDelegateController extends ProxyController  {
  private delegate: Delegate;
  constructor(tag: string, delegate: any) {
    super(tag);

    if (!this.delegate) {
      this.delegate = delegate;
    }
  }

  create(opts: any) {
    opts.delegate = this.delegate;
    return super.create(opts);
  }
}
