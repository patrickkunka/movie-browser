import {Component, Util} from '../generic';

import {
    beginNavigation
} from '../actions';

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
        this.stateManager.receivePoppedState(e.state);
    }

    shouldUpdate() {
        return false;
    }

    render(state, props, children) {
        return `<div class="root">${children}</div>`;
    }
}

export default Root;