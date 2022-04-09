import { observable } from '../core/observer.mjs';

export default class Router {
  constructor(baseURL = '/', routes) {
    this.baseURL = baseURL.replace(/^\/?/, '/').replace(/\/$/, '');
    this.currentRoute = observable({ value: '/' });
    this.routes = routes;
    this.updateListeners = [];
    this.setup();
  }

  get route() {
    return this.routes[this.currentRoute.value];
  }

  setup() {
    window.addEventListener("popstate", this.updateRouter.bind(this));
  }

  addUpdateListener(callback) {
    this.updateListeners.push(callback);
  }

  updateRouter() {
    this.currentRoute.value = location.pathname.replace(this.baseURL, "");
    this.updateListeners.forEach(callback => callback());
  }

  push(path) {
    window.history.pushState({}, path, `${this.baseURL}${path.replace(/^\/?/, '/').replace(/\/$/, '')}`);
    this.updateRouter();
  }
}