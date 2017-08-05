import {Component} from '../generic';

class SearchResultsInfo extends Component {
    render(state) {
        return (
            `<h3 class="search-results__info">
                ${state.hasResults ? `<strong>${state.results.pageStartsAt}</strong> to <strong>${state.results.pageEndsAt}</strong> of` : ''}
                ${state.results.totalResults} result${state.results.isSingleResult ? '' : 's'}
                for <strong>"${state.results.query}"</strong>
            </h3>`
        );
    }
}

export default SearchResultsInfo;