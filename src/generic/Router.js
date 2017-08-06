import Capture from './Capture';
import Route   from './Route';

/**
 * A basic router providing simple static and
 * dynamic segment matching.
 */

class Router {
    constructor(routes) {
        this.routes   = [];
        this.captures = [];

        Object.seal(this);

        this.init(routes);
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
     * Tests a provided URL against all routes, returning a populated
     * `Route` object if matching.
     *
     * @param  {string} url
     * @return {Route}
     */

    findMatchingRoute(url) {
        if (typeof url !== 'string') throw new TypeError(ERROR_INVALID_PATH);

        const [pathRaw, queryString=''] = url.split('?');

        const path = Router.sanitiseUrl(pathRaw);

        let request = null;
        let route   = null;
        let i       = -1;

        for (i = 0; i < this.captures.length; i++) {
            const capture = this.captures[i];

            request = capture.test(path);

            if (request) break;
        }

        if (!request) {
            throw new Error(ERROR_INVALID_ROUTE);
        }

        request.queryString = queryString;

        Object.assign(request.query, Router.parseQueryString(queryString));

        route = Object.assign(new Route(), this.routes[i]);

        route.request = request;

        Object.freeze(route);

        return route;
    }

    /**
     * Cleans up common typos in a provided path.
     *
     * @static
     * @param  {string} pathRaw
     * @return {string}
     */

    static sanitiseUrl(pathRaw) {
        // - convert to toLowerCase()
        // - strip whitespace
        // - replace multiple back slashes with one slash
        // - replace multiple forward slashes with one slash
        // - replace back slashes with forward slashes
        // - add leading slash
        // - add trailing slash

        return pathRaw
            .toLowerCase()
            .replace(/\s/g, '')
            .replace(/\\\\+/g, '\\')
            .replace(/\\/g, '/')
            .replace(/\/\/+/g, '/')
            .replace(/^\/?/, '/')
            .replace(/\/?$/, '/');
    }

    /**
     * Parses a serialised query string into a key/value hash.
     *
     * @static
     * @param  {string} queryString
     * @return {object}
     */

    static parseQueryString(queryStringRaw) {
        const queryString = queryStringRaw.replace('?', '');

        return queryString.split('&').reduce((query, parameter) => {
            const [key, value] = parameter.split('=');

            query[key] = typeof value === 'undefined' ? true : value;

            return query;
        }, {});
    }
}

export const ERROR_INVALID_ROUTES  = '[Router#init()] Invalid routes';
export const ERROR_INVALID_PATH    = '[Router#findMatchingRoute()] Invalid path';
export const ERROR_INVALID_ROUTE   = '[Router#findMatchingRoute()] No matching route found';

export default Router;