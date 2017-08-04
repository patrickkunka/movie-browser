import Router, {
    ERROR_NOT_INITIALISED
} from './Router';

import Capture from './Capture';

import {assert} from 'chai';

describe('Router', () => {
    it('should return a `Router` instance when instantiated', () => {
        const router = new Router();

        assert.instanceOf(router, Router);
    });

    it('should throw an error if used before initialisation', () => {
        const router = new Router();

        assert.throws(() => router.followPath('/'), ERROR_NOT_INITIALISED);
    });

    describe('#init()', () => {
        it('should parse consumer-provided routes in an array of captures', () => {
            const router = new Router();

            router.init([
                {
                    pattern: '/',
                    action: null
                }
            ]);

            assert.equal(router.routes.length, 1);
            assert.instanceOf(router.routes[0], Capture);
            assert.equal(router.routes[0].pattern, '/');
        });
    });
});
