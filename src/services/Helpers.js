/**
 * Various templating helper functions.
 */

class Helpers {
    /**
     * Iterates through an array of strings, returning a
     * comma-seperate list, or "Unknown" if empty.
     *
     * @param  {Array.<string>} items
     * @return {string}
     */

    static statsList(items) {
        return items.length > 0 ? items.map(item => item.name).join(', ') : 'Unknown';
    }

    /**
     * Truncates a provided string, stripping tags and appending an
     * ellipses if truncated.
     *
     * @param   {string} str
     * @param   {number} max
     * @return  {string}
     */

    static truncate(str, max) {
        const regex = /(<([^>]+)>)/ig;

        let output = '';

        if (typeof str !== 'string') return '';

        str = str.replace(regex, '');

        max = parseInt(max);

        if (str.length > max && str.length > 0) {
            output = str + ' ';
            output = output.substring(0, max);
            output = str.substring(0, output.lastIndexOf(' '));
            output = (output.length > 0) ? output : str.substring(0, max);

            return output + ' ...';
        }

        return str;
    }

    /**
     * Receives an ISO 8601 date string and returns the full year.
     *
     * @param  {string} input
     * @return {string}
     */

    static year(input) {
        return input ? new Date(input).getFullYear() : '';
    }
}

export default Helpers;