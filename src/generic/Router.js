import Capture from './Capture';
import Route   from './Route';

class Router {
    constructor() {
        this.routes   = [];
        this.captures = [];
    }

    /**
     * Initialises a new router instance by ingesting consumer-provided
     * route objects and building up regular expressions.
     *
     * @param  {Array.<object>} routes
     * @return {void}
     */

    init(routes) {
        if (!Array.isArray(routes) || routes.length < 1) throw new Error(ERROR_INVALID_ROUTES);

        this.routes   = routes.map(route => Object.assign(new Route(), route));
        this.captures = routes.map(route => new Capture(route.pattern));
    }

    /**
     * Tests a provided path against all routes, returning a popualed
     * `Route` object if matching.
     *
     * @param  {string} path
     * @return {Route}
     */

    findMatchingRoute(path) {
        if (this.routes.length < 1) throw new Error(ERROR_NOT_INITIALISED);
    }
}

export const ERROR_INVALID_ROUTES  = '[Router#init()] Invalid routes';
export const ERROR_NOT_INITIALISED = '[Router#followPath()] Not initialised';

export default Router;