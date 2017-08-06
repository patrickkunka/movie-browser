import {Component} from '../generic';
import Helpers from '../services/Helpers';

class Suggestion extends Component {
    render(state, props) {
        return `<a class="search-form__suggestion" href="/${props.id}/">${props.original_title}&nbsp;<span class="search-form__suggestion-year">${Helpers.year(props.release_date)}</span></a>`;
    }
}

export default Suggestion;