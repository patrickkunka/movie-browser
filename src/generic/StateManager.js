import Router from './Router';

class StateManager {
    constructor(router, reducer) {
        if (!(router instanceof Router)) throw new Error(ERROR_ROUTER_NOT_INJECTED);

        if (typeof reducer !== 'function') throw new Error(ERROR_REDUCER_NOT_INJECTED);

        this.state  = {};
        this.router = router;
        this.reducer = reducer;

        Object.seal(this);
    }

    /**
     * Initialises the application state with a provided URL.
     *
     * @param  {string}
     * @return {Promise}
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

export const HISTORY_MANIPULATION_PUSH    = 'push';
export const HISTORY_MANIPULATION_REPLACE = 'replace';

export const ERROR_ROUTER_NOT_INJECTED  = '[StateManager] Router must be injected';
export const ERROR_REDUCER_NOT_INJECTED = '[StateManager] Reducer must be injected';

export default StateManager;