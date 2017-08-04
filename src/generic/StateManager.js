import Router from './Router';

class StateManager {
    constructor(router, reducer) {
        if (!(router instanceof Router)) throw new Error(ERROR_ROUTER_NOT_INJECTED);

        if (typeof reducer !== 'function') {
            throw new Error(ERROR_REDUCER_NOT_INJECTED);
        }

        this.state  = {};
        this.router = router;
        this.reducer = reducer;

        Object.seal(this);
    }

    /**
     * Initialises the application state with a provided URL.
     *
     * @param  {string}
     * @return {Promise.<object>}
     */

    init(url) {
        return this.navigate(url, HISTORY_MANIPULATION_REPLACE);
    }

    /**
     * Updates the application state by navigating to a provided URL.
     *
     * @param  {string}  url
     * @param  {string}  [historyManipulation=push]
     * @return {Promise.<object>}
     */

    navigate(url, historyManipulation=HISTORY_MANIPULATION_PUSH) {
        return Promise.resolve()
            .then(() => {
                const route = this.router.findMatchingRoute(url);

                return this.dispatch(route.action, route.request);
            })
            .then(nextState => {
                StateManager.updateHistory(nextState, url, historyManipulation);

                return nextState;
            });
    }

    /**
     * Updates the application state by invoking an action function.
     *
     * @param  {function} actionFn
     * @return {Promise.<object>}
     */

    dispatch(actionFn) {
        const args = Array.from(arguments).slice(1);

        return Promise.resolve()
            .then(() => {
                const returnValue = actionFn(...args);

                if (typeof returnValue === 'function') {
                    // Asyncronous action

                    return returnValue();
                }

                // Syncronous action

                return returnValue;
            })
            .then(action => {
                const nextState = [action].reduce(this.reducer, this.state);

                return Object.freeze(nextState);
            });
    }

    /**
     * Returns the current application state. Promotes on-demand retrieval
     * rather than by reference.
     *
     * @return {object}
     */

    getState() {
        return this.state;
    }

    /**
     * Updates the browser history as appropriate in response to a new
     * application state.
     *
     * @static
     * @param  {object} state
     * @param  {string} url
     * @param  {string} historyManipulation
     * @return {void}
     */

    static updateHistory(state, url, historyManipulation) {
        if (typeof window === 'undefined') return;

        switch (historyManipulation) {
            case HISTORY_MANIPULATION_REPLACE:
                window.history.replaceState(state, '', url);

                break;
            case HISTORY_MANIPULATION_PUSH:
                window.history.pushState(state, '', url);

                break;
            default:
                throw new Error(ERROR_INVALID_HISTORY_MANIPULATION);
        }
    }
}


export const HISTORY_MANIPULATION_PUSH    = 'push';
export const HISTORY_MANIPULATION_REPLACE = 'replace';

export const ERROR_ROUTER_NOT_INJECTED          = '[StateManager] Router must be injected';
export const ERROR_REDUCER_NOT_INJECTED         = '[StateManager] Reducer must be injected';
export const ERROR_INVALID_HISTORY_MANIPULATION = '[StateManager] Invalid history manipulation';

export default StateManager;