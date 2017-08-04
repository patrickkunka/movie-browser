import Request from './Request';

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

        // Initialise an expression string using the provided pattern

        let re = this.pattern;
        let matches = null;

        while ((matches = DYNAMIC_SEGMENT_RE.exec(this.pattern)) !== null) {
            const fullMatch = matches[0];
            const propKey   = matches[1];

            // Push extracted param key name into `paramKeys`

            this.paramKeys.push(propKey);

            // Replace capturing segment in pattern with capturing expression

            re = re.replace(fullMatch, DYNAMIC_CAPTURE);
        }

        // Mark start and end

        re = '^' + re + '$';

        // Create regular expression from expression string, assign to instance

        this.re = new RegExp(re, 'g');
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

export const ERROR_INVALID_PATTERN = '[Capture#build()] Invalid pattern provided';

// A simple expression for matching dynamic segments. Matches a
// ":" character followed by any number of word characters.
// Captures the param name.

const DYNAMIC_SEGMENT_RE = /:(\w+)/g;

// A capturing group to extract any number of valid segment chracters
// from a provided path

const DYNAMIC_CAPTURE = '([a-z0-9-.]+)';

export default Capture;