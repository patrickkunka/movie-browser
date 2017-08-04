import {Component} from '../generic';

class Main extends Component {
    render(state, props, children) {
        return `<main class="main">${children}</main>`;
    }
}

export default Main;