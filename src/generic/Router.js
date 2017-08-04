class Router {
    constructor() {
        this.routes = [];
    }

    /**
     * Initialises a new router instance by ingesting consumer-provided route
     * objects and building up regular expressions.
     *
     * @param  {Array.<object>} routes
     * @return {void}
     */

    init(routes) {

    }

    /**
     * Tests a provided path against all routes, invoking an
     * associated action function and returning an action object
     * if matching.
     *
     * @param  {string} path
     * @return {Promise.<object>}
     */

    followPath(path) {
        if (this.routes.length < 1) throw new Error(ERROR_NOT_INITIALISED);
    }
}

export const ERROR_NOT_INITIALISED = '[Router#followPath()] Not initialised';

export default Router;