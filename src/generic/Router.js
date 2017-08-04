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
     * Tests a provided path against all routes, invoking a
     * an associated action function and returning an action object
     * if matching.
     *
     * @param  {string} path
     * @return {Promise.<object>}
     */

    followPath(path) {

    }
}

export default Router;