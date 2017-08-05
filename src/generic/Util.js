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
}

export default Util;