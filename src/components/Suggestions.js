import {Component} from '../generic';

class Suggestions extends Component {
    shouldUpdate(nextState) {
        return this.state.suggestions.query !== nextState.suggestions.query;
    }

    render(state, props, children) {
        return `<div class="search-form__suggestions" data-ref="suggestions">${children}</div>`;
    }
}

export default Suggestions;