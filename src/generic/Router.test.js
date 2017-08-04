import Router, {
    ERROR_NOT_INITIALISED,
    ERROR_INVALID_ROUTES
} from './Router';

import Capture from './Capture';
import Route   from './Route';

import chai, {assert} from 'chai';
import deepEqual from 'chai-shallow-deep-equal';

chai.use(deepEqual);

describe('Router', () => {
    it('should return a `Router` instance when instantiated', () => {
        const router = new Router();

        assert.instanceOf(router, Router);
    });

    it('should throw an error if used before initialisation', () => {
        const router = new Router();

        assert.throws(() => router.findMatchingRoute('/'), ERROR_NOT_INITIALISED);
    });

    describe('#init()', () => {
        it('should throw an error if consumer-provided routes are invalid', () => {
            const router = new Router();

            assert.throws(() => router.init(void(0)), ERROR_INVALID_ROUTES);
        });

        it('should throw an error if no routes are passed', () => {
            const router = new Router();

            assert.throws(() => router.init([]), ERROR_INVALID_ROUTES);
        });

        it('should map consumer-provided routes in an array of `Route` instances', () => {
            const router = new Router();

            router.init([
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
            const router = new Router();

            router.init([
                {
                    pattern: '/',
                    action: null
                }
            ]);

            assert.equal(router.captures.length, 1);
            assert.instanceOf(router.captures[0], Capture);
            assert.deepEqual(router.captures[0].re, /^\/$/g);
        });
    });

    describe('#findMatchingRoute', () => {

    });
});
