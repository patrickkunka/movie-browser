import Request from './Request';

class Capture {
    constructor() {
        this.re      = null;
        this.pattern = null;
        this.action  = null;
    }

    /**
     * Generates a capturing regular expression from the capture's
     * route pattern.
     *
     * @return {void}
     */

    build() {

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