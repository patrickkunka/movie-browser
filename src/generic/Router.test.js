import Router, {
    ERROR_INVALID_ROUTES,
    ERROR_INVALID_PATH,
    ERROR_INVALID_ROUTE
} from './Router';

import Capture from './Capture';
import Route   from './Route';

import chai, {assert} from 'chai';
import deepEqual from 'chai-shallow-deep-equal';

chai.use(deepEqual);

describe('Router', () => {
    it('should throw an error if consumer-provided routes are invalid', () => {
        assert.throws(() => new Router(void(0)), ERROR_INVALID_ROUTES);
    });

    it('should throw an error if no routes are passed', () => {
        assert.throws(() => new Router([]), ERROR_INVALID_ROUTES);
    });

    it('should map consumer-provided routes in an array of `Route` instances', () => {
        const router = new Router([
            {
                pattern: '/',
                action: null
            }
        ]);

        assert.equal(router.routes.length, 1);
        assert.instanceOf(router.routes[0], Route);
        assert.equal(router.routes[0].pattern, '/');
    });

    it('should parse consumer-provided routes in an array of built `Capture` instances', () => {
        const router = new Router([
            {pattern: '/'}
        ]);

        assert.equal(router.captures.length, 1);
        assert.instanceOf(router.captures[0], Capture);
        assert.deepEqual(router.captures[0].re, /^\/$/g);
    });

    describe('#findMatchingRoute', () => {
        it('should throw an error if an invalid path is passed', () => {
            const router = new Router([
                {pattern: '/'}
            ]);

            assert.throws(() => router.findMatchingRoute(void(0)), ERROR_INVALID_PATH);
        });

        it('should throw an error if no matching route is found', () => {
            const router = new Router([
                {pattern: '/'}
            ]);

            assert.throws(() => router.findMatchingRoute('/foo/'), ERROR_INVALID_ROUTE);
        });

        it('should return a populated instance of a `Route` for matching paths', () => {
            const action = () => (void(0));
            const router = new Router([
                {pattern: '/', action}
            ]);

            const route = router.findMatchingRoute('/');

            assert.instanceOf(route, Route);
            assert.equal(route.pattern, '/');
            assert.equal(route.action, action);
        });

        it('should return a populated instance of a `Route` for matching paths with dynamic segments', () => {
            const router = new Router([
                {pattern: '/:dynamicSegment/'}
            ]);

            const route = router.findMatchingRoute('/foo/');

            assert.instanceOf(route, Route);
            assert.equal(route.pattern, '/:dynamicSegment/');
            assert.equal(route.request.path, '/foo/');
            assert.equal(route.request.params.dynamicSegment, 'foo');
        });

        it('should parse an associated query string into a hash', () => {
            const router = new Router([
                {pattern: '/:dynamicSegment/'}
            ]);

            const route = router.findMatchingRoute('/foo/?bar=baz');

            assert.instanceOf(route, Route);
            assert.equal(route.pattern, '/:dynamicSegment/');
            assert.equal(route.request.path, '/foo/');
            assert.equal(route.request.params.dynamicSegment, 'foo');
            assert.equal(route.request.queryString, 'bar=baz');
            assert.equal(route.request.query.bar, 'baz');
        });

        it('should sanitize the provided path', () => {
            const router = new Router([
                {pattern: '/required-segment/'}
            ]);

            const route = router.findMatchingRoute(' /required-segment ');

            assert.instanceOf(route, Route);
            assert.equal(route.request.path, '/required-segment/');
        });
    });
});
