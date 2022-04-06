export default class Router {
  constructor(baseURL = '/', routes) {
    this.baseURL = baseURL.replace(/^\/?/, '/').replace(/\/$/, '');
    this.currentRoute = '/';
    this.routes = routes;
    this.updateListeners = [];
    this.setup();
  }

  route() {
    return this.routes[this.currentRoute];
  }

  setup() {
    window.addEventListener("popstate", this.updateRouter.bind(this));
  }

  addUpdateListener(callback) {
    this.updateListeners.push(callback);
  }

  updateRouter() {
    this.currentRoute = location.pathname.replace(this.baseURL, "");
    this.updateListeners.forEach(callback => callback());
  }

  push(path) {
    window.history.pushState({}, path, `${this.baseURL}${path.replace(/^\/?/, '/').replace(/\/$/, '')}`);
    this.updateRouter();
  }
}