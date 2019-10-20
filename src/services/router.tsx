interface IRoute {
  name: string;
}
class Router {
  routes: IRoute[] = [];
  addRoute(routeName: string) {
    console.log(`Router.addRoute:${routeName}`);
    this.routes.push({ name: routeName });
  }
}

export const router = new Router();