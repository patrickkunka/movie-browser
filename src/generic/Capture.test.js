import Capture, {ERROR_INVALID_PATTERN} from './Capture';
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
            const capture = new Capture();

            capture.pattern = '/';

            capture.build();

            assert.deepEqual(capture.re, /^\/$/g);
        });

        it('should generate the appropriate expression for a single segment', () => {
            const capture = new Capture();

            capture.pattern = '/required-segment/';

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment\/$/g);
        });

        it('should generate the appropriate expression for multiple single segment', () => {
            const capture = new Capture();

            capture.pattern = '/required-segment-1/required-segment-2/';

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment-1\/required-segment-2\/$/g);
        });

        it('should generate the appropriate expression for a single capturing segment', () => {
            const capture = new Capture();

            capture.pattern = '/:capturingSegment/';

            capture.build();

            assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment');
        });

        it('should generate the appropriate expression for multiple capturing segments', () => {
            const capture = new Capture();

            capture.pattern = '/:capturingSegment1/:capturingSegment2/';

            capture.build();

            assert.deepEqual(capture.re, /^\/([a-z0-9-.]+)\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment1');
            assert.equal(capture.paramKeys[1], 'capturingSegment2');
        });

        it('should generate the appropriate expression for a combiation of segment types', () => {
            const capture = new Capture();

            capture.pattern = '/required-segment/:capturingSegment/';

            capture.build();

            assert.deepEqual(capture.re, /^\/required-segment\/([a-z0-9-.]+)\/$/g);
            assert.equal(capture.paramKeys[0], 'capturingSegment');
        });
    });
});