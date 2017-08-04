import Capture, {ERROR_INVALID_PATTERN} from './Capture';
import {assert} from 'chai';

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
            const capture = new Capture();

            capture.pattern = '/';

            assert.equal(capture.re, /^\/$/g);
        });

        it('should generate the appropriate expression for a single required segment', () => {
            const capture = new Capture();

            capture.pattern = '/required-segment/';

            assert.equal(capture.re, /^\/required-segment\/$/g);
        });

        it('should generate the appropriate expression for a single required capturing segment', () => {
            const capture = new Capture();

            capture.pattern = '/:capturingSegment/';

            assert.equal(capture.re, /^\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment');
        });
    });
});