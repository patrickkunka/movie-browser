import {Component} from '../generic';

class Main extends Component {
    shouldUpdate(nextState) {
        return this.state.view !== nextState.view;
    }

    render(state, props, children) {
        return `<main class="main">${children}</main>`;
    }
}

export default Main;