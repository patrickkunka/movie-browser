import Capture, {
    ERROR_INVALID_PATTERN,
    ERROR_INVALID_PATH
} from './Capture';

import Request from './Request';

import chai, {assert} from 'chai';
import deepEqual from 'chai-shallow-deep-equal';

chai.use(deepEqual);

describe('Capture', () => {
    it('should return a `Capture` instance when instantiated', () => {
        const capture = new Capture();

        assert.instanceOf(capture, Capture);
    });

    describe('Capture#build()', () => {
        it('should error if called with an invalid pattern', () => {
            const capture = new Capture();

            assert.throws(() => capture.build(), ERROR_INVALID_PATTERN);
        });

        it('should generate the appropriate expression for a root segment', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/$/g);
        });

        it('should generate the appropriate expression for a single segment', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/required-segment/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment\/$/g);
        });

        it('should generate the appropriate expression for multiple single segment', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/required-segment-1/required-segment-2/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment-1\/required-segment-2\/$/g);
        });

        it('should generate the appropriate expression for a single capturing segment', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/:capturingSegment/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment');
        });

        it('should generate the appropriate expression for multiple capturing segments', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/:capturingSegment1/:capturingSegment2/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment1');
            assert.equal(capture.paramKeys[1], 'capturingSegment2');
        });

        it('should generate the appropriate expression for a combiation of segment types', () => {
            const capture = Object.assign(new Capture(), {
                pattern: '/required-segment/:capturingSegment/'
            });

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment');
        });
    });

    describe('Capture#test()', () => {
        it('should throw an error if no valid path provided', () => {
            const capture = Object.assign(new Capture(), {pattern: '/'});

            capture.build();

            assert.throws(() => capture.test(), ERROR_INVALID_PATH);
        });

        it('should return `null` if no match found for the provided path', () => {
            const capture = Object.assign(new Capture(), {pattern: '/'});

            capture.build();

            const request = capture.test('/foo/');

            assert.isNull(request);
        });

        it('should return a `Request` instance if matching the provided path', () => {
            const capture = Object.assign(new Capture(), {pattern: '/'});

            capture.build();

            const request = capture.test('/');

            assert.instanceOf(request, Request);
        });

        it('should return a request object with `path` property populated', () => {
            const capture = Object.assign(new Capture(), {pattern: '/foo/'});

            capture.build();

            const request = capture.test('/foo/');

            assert.instanceOf(request, Request);
            assert.equal(request.path, '/foo/');
        });

        it('should return a request object with a populated params hash if dynamic segments present', () => {
            const capture = Object.assign(new Capture(), {pattern: '/:dynamicSegment/'});

            capture.build();

            const request = capture.test('/foo/');

            assert.instanceOf(request, Request);
            assert.isOk(request.params.dynamicSegment);
            assert.equal(request.params.dynamicSegment, 'foo');
        });
    });
});