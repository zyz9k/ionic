import { VueConstructor } from 'vue/types/vue';
export class Delegate {
  private _vue: VueConstructor;
  constructor(Vue: VueConstructor) {
    this._vue = Vue;
  }

  // Attach the passed Vue component to DOM
  attachViewToDom(
    parentElement: any,
    component: any,
    params?: any,
    cssClasses?: string[]
  ): Promise<any> {
    // Handle HTML elements
    if (isElement(component)) {
      // Add any classes to the element
      if (cssClasses) {
        addClasses(component, cssClasses);
      }

      // Append the element to DOM
      parentElement.appendChild(component);
      return Promise.resolve(component);
    }

    // Get the Vue controller
    return this.vueController(component).then(controller => {
      const vueComponent = this.vueComponent(controller, params);

      // Add any classes to the Vue component's root element
      addClasses(vueComponent.$el, cssClasses);

      // Append the Vue component to DOM
      parentElement.appendChild(vueComponent.$el);
      return vueComponent.$el;
    });
  }

  // Remove the earlier created Vue component from DOM
  removeViewFromDom(_parentElement: any, childElement: any) {
    // Destroy the Vue component instance
    if (childElement.__vue__) {
      childElement.__vue__.$destroy();
    }

    return Promise.resolve();
  }

  // Handle creation of sync and async components
  vueController(component: any) {
    return Promise.resolve(
      typeof component === 'function' && component.cid === undefined
        ? component().then((c: any) =>
            this._vue.extend(isESModule(c) ? c.default : c)
          )
        : this._vue.extend(component)
    );
  }

  // Create a new instance of the Vue component
  vueComponent(controller: any, opts: any) {
    return new controller(opts).$mount();
  }
}

// Check Symbol support
const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

// Check if object is an ES module
function isESModule(obj: any) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module');
}

// Check if value is an Element
function isElement(el: any) {
  return typeof Element !== 'undefined' && el instanceof Element;
}

// Add an array of classes to an element
function addClasses(element: any, classes: string[] = []) {
  for (const cls of classes) {
    (element as HTMLElement).classList.add(cls);
  }
}
