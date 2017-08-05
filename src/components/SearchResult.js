import {Component} from '../generic';

import Helpers from '../services/Helpers';

class SearchResult extends Component {
    render(state, props) {
        return (
            `<a href="/${props.id}/" class="search-result">
                <h2 class="search-result__title">${props.original_title} <span class="search-result__year">${Helpers.year(props.release_date)}</span></h2>

                <p class="search-result__overview">${Helpers.truncate(props.overview, 190)}</p>
            </a>`
        );
    }
}

export default SearchResult;