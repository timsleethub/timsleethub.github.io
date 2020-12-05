export default class EventEmitter {
  constructor() {
    this.handlersByType = {};
  }


  addEventListener(eventName, handlerFn) {
    this.handlersByType[eventName] = this.handlersByType[eventName] || [];
    this.handlersByType[eventName].push(handlerFn);
  }


  dispatchEvent(eventObj) {
    const handlers = this.handlersByType[eventObj.type];
    if (handlers) {
      handlers.forEach(handlerFn => handlerFn(eventObj));
    } else {
      console.warn('no handlers for event', eventObj);
    }
  }


  removeEventListener(eventName, handlerFn) {

  }
}
