// A proxy method that initializes the controller and calls requested method
export function proxyMethod(tag: string, method: string, ...args: any[]) {
  const controller = initController(tag);
  return controller
    .componentOnReady()
    .then(() => (controller as any)[method].apply(controller, args));
}

// Initialize an Ionic controller and append it to DOM
export function initController(tag: string) {
  let element = document.querySelector(tag);

  if (!element) {
    element = document.createElement(tag);
    document.body.appendChild(element);
  }
  return element as HTMLStencilElement;
}
