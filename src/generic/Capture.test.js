import Capture, {
    ERROR_INVALID_PATTERN,
    ERROR_INVALID_PATH
} from './Capture';

import Request from './Request';

import chai, {assert} from 'chai';
import deepEqual from 'chai-shallow-deep-equal';

chai.use(deepEqual);

describe('Capture', () => {
    it('should error if instantiated with an invalid pattern', () => {
        assert.throws(() => new Capture(), ERROR_INVALID_PATTERN);
    });

    it('should generate the appropriate expression for a root segment', () => {
        const capture = new Capture('/');

        assert.deepEqual(capture.re, /^\/$/g);
    });

    it('should generate the appropriate expression for a single segment', () => {
        const capture = new Capture('/required-segment/');

        assert.deepEqual(capture.re, /^\/required-segment\/$/g);
    });

    it('should generate the appropriate expression for multiple single segment', () => {
        const capture = new Capture('/required-segment-1/required-segment-2/');

        assert.deepEqual(capture.re, /^\/required-segment-1\/required-segment-2\/$/g);
    });

    it('should generate the appropriate expression for a single capturing segment', () => {
        const capture = new Capture('/:capturingSegment/');

        assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/$/g);
        assert.equal(capture.paramKeys[0], 'capturingSegment');
    });

    it('should generate the appropriate expression for multiple capturing segments', () => {
        const capture = new Capture('/:capturingSegment1/:capturingSegment2/');

        assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/([a-z0-9-.]+)\/$/g);
        assert.equal(capture.paramKeys[0], 'capturingSegment1');
        assert.equal(capture.paramKeys[1], 'capturingSegment2');
    });

    it('should generate the appropriate expression for a combiation of segment types', () => {
        const capture = new Capture('/required-segment/:capturingSegment/');

        assert.deepEqual(capture.re, /^\/required-segment\/([a-z0-9-.]+)\/$/g);
        assert.equal(capture.paramKeys[0], 'capturingSegment');
    });

    describe('#test()', () => {
        it('should throw an error if no valid path provided', () => {
            const capture = new Capture('/');

            assert.throws(() => capture.test(), ERROR_INVALID_PATH);
        });

        it('should return `null` if no match found for the provided path', () => {
            const capture = new Capture('/');

            const request = capture.test('/foo/');

            assert.isNull(request);
        });

        it('should return a `Request` instance if matching the provided path', () => {
            const capture = new Capture('/');

            const request = capture.test('/');

            assert.instanceOf(request, Request);
        });

        it('should return a request object with `path` property populated', () => {
            const capture = new Capture('/foo/');

            const request = capture.test('/foo/');

            assert.instanceOf(request, Request);
            assert.equal(request.path, '/foo/');
        });

        it('should return a request object with a populated params hash if dynamic segments present', () => {
            const capture = new Capture('/:dynamicSegment/');

            const request = capture.test('/foo/');

            assert.instanceOf(request, Request);
            assert.isOk(request.params.dynamicSegment);
            assert.equal(request.params.dynamicSegment, 'foo');
        });
    });
});