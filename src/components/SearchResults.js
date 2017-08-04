import {Component} from '../generic';

class SearchResults extends Component {
    render(state, props, children) {
        return (
            `<section class="search-results">
                <h1 class="search-results__query">Results for "${state.query}"</h1>

                ${children}
            </section>`
        );
    }
}

export default SearchResults;