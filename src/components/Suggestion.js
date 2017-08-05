import {Component} from '../generic';

class Suggestion extends Component {
    render(state, props) {
        return `<a class="search-form__suggestion" href="/${props.id}/">${props.original_title}</a>`;
    }
}

export default Suggestion;