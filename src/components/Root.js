import {Component} from '../generic';

class Main extends Component {
    render(state, props, children) {
        return `<main>${children}</main>`;
    }
}

export default Main;