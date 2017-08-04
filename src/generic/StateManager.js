class StateManager {
    constructor() {
        this.state = null;

        Object.seal(this);
    }

    /**
     * Initialises the application state with a provided URL
     *
     * @param  {string}
     * @return {void}
     */

    init(url) {

    }

    /**
     * Updates the application state by navigating to a provided URL.
     *
     * @param  {string} url
     * @param  {string} [historyManipulation=push]
     * @return {Promise}
     */

    navigate(url, historyManipulation=HISTORY_MANIPULATION_PUSH) {

    }

    /**
     * Updates the application state by invoking an action function.
     *
     * @param {function} action
     */

    dispatch(action) {

    }

    /**
     * Returns the current application state. Promotes on-demand retrieval
     * rather than by reference.
     *
     * @return {object}
     */

    getState() {

    }
}

export const HISTORY_MANIPULATION_PUSH = 'push';
export const HISTORY_MANIPULATION_REPLACE = 'replace';

export default StateManager;