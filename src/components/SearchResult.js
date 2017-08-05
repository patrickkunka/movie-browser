import {Component} from '../generic';

class SearchResult extends Component {
    render(state, props) {
        return (
            `<a href="/${props.id}/" class="search-result">
                <h2 class="search-result__title">${props.original_title}</h2>
            </a>`
        );
    }
}

export default SearchResult;