import {Component, Util} from '../generic';

import {
    beginNavigation
} from '../actions';

import State   from '../models/State';
import Results from '../models/Results';

class Root extends Component {
    constructor() {
        super(...arguments);

        this.configure({
            events: [
                {
                    ref: 'root',
                    on: 'click',
                    bind: 'handleClick'
                },
                {
                    on: 'popstate',
                    bind: 'handlePopState'
                }
            ]
        });
    }

    /**
     * @param  {MouseEvent} e
     * @return {void}
     */

    handleClick(e) {
        const anchor = e.target.matches('a[href]') ? e.target : e.target.closest('a[href]');

        let href = '';

        if (!anchor || (href = anchor.href) === '' || Util.isExternalUrl(href) || e.metaKey) return;

        e.preventDefault();

        const path = href.replace(window.location.origin, '');

        this.stateManager.dispatch(beginNavigation);

        this.stateManager.navigate(path)
            .catch(err => console.error(err));
    }

    /**
     * @param  {PopStateEvent} e
     * @return {void}
     */

    handlePopState(e) {
        const plainState = e.state;
        const state = Object.assign(new State(), plainState);

        state.results = Object.assign(new Results(), state.results);
        state.suggestions = Object.assign(new Results(), state.suggestions);

        this.stateManager.receivePoppedState(state);
    }

    shouldUpdate() {
        return false;
    }

    render(state, props, children) {
        return `<div class="root">${children}</div>`;
    }
}

export default Root;