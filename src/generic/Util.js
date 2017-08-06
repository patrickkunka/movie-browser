/**
 * A static class of shared utility functions.
 */

class Util {
    /**
     * Checks if a provided URL is not on the same domain
     * as the current location, and is therefore external.
     *
     * @param   {string}    url
     * @return  {boolean}
     */

    static isExternalUrl(url) {
        let checker = null;

        if (url.match(/^\//)) return false;

        checker = new RegExp(window.location.host);

        return !checker.test(url);
    }

    /**
     * Returns a function which calls the provided function
     * only after the specified interval has elapsed between
     * function calls. An optional `immediate` boolean will
     * cause the provided function to be called once immediately
     * before waiting.
     *
     * @param   {function}  fn
     * @param   {number}    interval
     * @param   {boolean}   [immediate=false]
     * @return  {function}
     */

    static debounce(fn, interval, immediate) {
        let timeoutId = -1;

        return function() {
            const args = arguments;

            const later = () => {
                timeoutId = -1;

                fn.apply(this, args); // eslint-disable-line no-invalid-this
            };

            if (timeoutId < 0 && immediate) {
                later();
            } else {
                try {
                    clearTimeout(timeoutId);
                } catch (e) {} // eslint-disable-line no-empty

                timeoutId = setTimeout(later, interval);
            }
        };
    }
}

export default Util;