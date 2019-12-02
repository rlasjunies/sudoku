import { testEnvironment } from "../global/global";
interface IRoute {
  name: string;
}
class Router {
  routes: IRoute[] = [];
  addRoute(routeName: string) {
    //console.log(`Router.addRoute:${routeName}`);
    this.routes.push({ name: routeName });
  }

  navigateTo(route: string) {
    testEnvironment && console.log(`NavigateTo:${route}`)
  }
}

export const router = new Router();