import {Component} from '../generic';

class Suggestions extends Component {
    shouldUpdate(nextState) {
        return this.state.suggestions.query !== nextState.suggestions.query;
    }

    render(state, props, children) {
        return `<ul>${children}</ul>`;
    }
}

export default Suggestions;