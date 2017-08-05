import {Component} from '../generic';

class SearchResults extends Component {
    render(state, props, children) {
        return (
            `<section class="search-results">
                <div class="search-results__wrapper wrapper wrapper--constrained">
                    ${children}
                </div>
            </section>`
        );
    }
}

export default SearchResults;