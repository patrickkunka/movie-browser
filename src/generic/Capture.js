import Request from './Request';

/**
 * Holds regular expressions and extracted paramKeys for
 * consumer-provided application routes.
 */

class Capture {
    constructor(pattern) {
        this.re         = null;
        this.paramKeys  = [];

        this.build(pattern);

        Object.seal(this);
    }

    /**
     * Generates a capturing regular expression and any associated
     * param keys from the capture's route pattern.
     *
     * @param  {string}
     * @return {void}
     */

    build(pattern) {
        if (!pattern || typeof pattern !== 'string') {
            throw new TypeError(ERROR_INVALID_PATTERN);
        }

        // Initialise an expression string using the provided pattern

        let re = pattern;
        let matches = null;

        // Iterate through any dynamic segments in the pattern

        while ((matches = DYNAMIC_SEGMENT_RE.exec(pattern)) !== null) {
            const fullMatch = matches[0];
            const propKey   = matches[1];

            // Push extracted param key name into `paramKeys`

            this.paramKeys.push(propKey);

            // Replace capturing segment in pattern with capturing expression

            re = re.replace(fullMatch, DYNAMIC_CAPTURE);
        }

        // Mark start and end

        re = '^' + re + '$';

        // Create regular expression from string, assign to instance
        // for runtime testing

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
        if (typeof path !== 'string') throw new Error(ERROR_INVALID_PATH);

        let matches = null;

        // If the path matches the capture's expression,

        if ((matches = this.re.exec(path))) {
            const request = new Request();

            request.path = path;

            // Iterate through `paramKeys` to extract values in `params` hash

            this.paramKeys.reduce((params, key, i) => {
                const value = matches[i + 1];

                params[key] = value;

                return params;
            }, request.params);

            // Ensure expression is reset

            this.re.lastIndex = 0;

            return request;
        }

        return null;
    }
}

// A simple expression for matching dynamic segments. Matches a
// ":" character followed by any number of word characters.
// Captures the param name.

const DYNAMIC_SEGMENT_RE = /:(\w+)/g;

// A capturing group to extract any number of valid segment chracters
// from a provided path

const DYNAMIC_CAPTURE = '([a-z0-9-.]+)';

// Error messages are exposed for testing

export const ERROR_INVALID_PATTERN = '[Capture#build()] Invalid pattern provided';
export const ERROR_INVALID_PATH    = '[Capture#test()] Invalid path provided';

export default Capture;