import {Component} from '../generic';

class Root extends Component {
    render(state, props, children) {
        return `<div class="root">${children}</div>`;
    }
}

export default Root;