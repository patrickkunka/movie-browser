import Request from './Request';

export const ERROR_INVALID_PATTERN = '[Capture#build()] Invalid pattern provided';

class Capture {
    constructor() {
        this.re         = null;
        this.pattern    = '';
        this.action     = null;
        this.paramKeys  = [];
    }

    /**
     * Generates a capturing regular expression from the capture's
     * route pattern.
     *
     * @return {void}
     */

    build() {
        if (!this.pattern || typeof this.pattern !== 'string') {
            throw new TypeError(ERROR_INVALID_PATTERN);
        }
    }

    /**
     * Tests a provided path against the capture's regular
     * expression, returning a populated `Request` object if
     * matching.
     *
     * @param  {string} path
     * @return {(Request|null)}
     */

    test(path) {

    }
}

export default Capture;