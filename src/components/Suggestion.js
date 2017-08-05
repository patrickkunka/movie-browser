import {Component} from '../generic';

class Suggestion extends Component {
    render(state, props) {
        return `<li><a href="/${props.id}/">${props.original_title}</a></li>`;
    }
}

export default Suggestion;