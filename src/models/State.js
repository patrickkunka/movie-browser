import {
    VIEW_MOVIE,
    VIEW_SEARCH,
    VIEW_ERROR
} from '../constants';

import Results from './Results';

class State {
    constructor() {
        this.view                  = '';
        this.url                   = '';
        this.path                  = '';
        this.suggestions           = new Results();
        this.results               = new Results();
        this.isNavigating          = false;
        this.isFetchingSuggestions = false;
        this.movie                 = null;

        Object.seal(this);
    }

    get isSearchView() {
        return this.view === VIEW_SEARCH;
    }

    get isMovieView() {
        return this.view === VIEW_MOVIE;
    }

    get isErrorView() {
        return this.view === VIEW_ERROR;
    }

    get hasSuggestions() {
        return this.suggestions.totalResults > 0;
    }

    get hasResults() {
        return this.results.totalResults > 0;
    }
}

export default State;