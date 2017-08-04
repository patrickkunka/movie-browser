import {Component} from '../generic';

class SearchResults extends Component {
    render(state, props, children) {
        return (
            `<section class="search-results">
                ${children}
            </section>`
        );
    }
}

export default SearchResults;