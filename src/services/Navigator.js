import {
    beginNavigation
} from './actions';

import StateManager from './generic/StateManager';

class Navigator {
    constructor(stateManager) {
        if (!(stateManager instanceof StateManager)) throw new Error(ERROR_STATE_MANAGER_NOT_INJECTED);

        this.stateManager = stateManager;

        this.bindHandlers();
    }

    /**
     * @return {void}
     */

    bindHandlers() {
        document.body.addEventListener('click', this.handleClick.bind(this));
        window.addEventListener('popState', this.handlePopState.bind(this));
    }

    /**
     * @param  {MouseEvent} e
     * @return {void}
     */

    handleClick(e) {
        const anchor = e.target.matches('a[href]') ? e.target : e.closest('a[href]');

        let href = '';

        if (!anchor || (href = anchor.href) === '') return;

        this.stateManager.dispatch(beginNavigation);

        this.stateManager.navigate(href)
            .catch(err => console.error(err));
    }

    /**
     * @param  {PopStateEvent} e
     * @return {void}
     */

    handlePopState(e) {
        this.stateManager.receivePoppedState(e.state);
    }
}

export const ERROR_STATE_MANAGER_NOT_INJECTED = '[Navigator] State manager must be injected';

export default Navigator;