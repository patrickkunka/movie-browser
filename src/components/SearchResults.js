import {Component} from '../generic';

class SearchResults extends Component {
    render(state, props, children) {
        return (
            `<section class="search-results">
                <div class="search-results__wrapper wrapper wrapper--constrained">
                    <h3 class="search-results__info">Found <strong>${state.results.totalResults}</strong> result${state.results.isSingleResult ? '' : 's'} for <strong>"${state.results.query}"</strong></h3>

                    ${children}
                </div>
            </section>`
        );
    }
}

export default SearchResults;