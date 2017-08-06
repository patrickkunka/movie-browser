import State   from './models/State';
import Results from './models/Results';

import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_BEGIN_FETCH_SUGGESTIONS,
    ACTION_CLEAR_SUGGESTIONS,
    ACTION_HANDLE_ERROR,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE,
    ACTION_RECEIVE_SUGGESTIONS,
    VIEW_SEARCH,
    VIEW_MOVIE,
    VIEW_ERROR,
    RESULTS_PER_PAGE,
    MAX_SUGGESTIONS
} from './constants';

const rootReducer = (prevState, action) => {
    switch (action.type) {
        case ACTION_BEGIN_NAVIGATION: {
            const nextState = Object.assign(new State(), prevState);

            nextState.isNavigating = true;

            return nextState;
        }
        case ACTION_NAVIGATE_TO_MOVIE: {
            const nextState = new State();

            nextState.view  = VIEW_MOVIE;
            nextState.movie = action.movie;

            return nextState;
        }
        case ACTION_NAVIGATE_TO_SEARCH: {
            const nextState = new State();

            nextState.view = VIEW_SEARCH;
            nextState.results.query = action.query;

            if (action.results) {
                nextState.results.items = action.results.results;
                nextState.results.activePage = action.page;
                nextState.results.totalResults = action.results.total_results;
                nextState.results.itemsPerPage = RESULTS_PER_PAGE;
            }

            return nextState;
        }
        case ACTION_BEGIN_FETCH_SUGGESTIONS: {
            const nextState = Object.assign(new State(), prevState);

            nextState.isFetchingSuggestions = true;

            return nextState;
        }
        case ACTION_RECEIVE_SUGGESTIONS: {
            const nextState = Object.assign(new State(), prevState);

            nextState.isFetchingSuggestions = false;

            nextState.suggestions.query = action.query;
            nextState.suggestions.items = action.suggestions.results.slice(0, MAX_SUGGESTIONS);
            nextState.suggestions.totalResults = nextState.suggestions.items.length;
            nextState.suggestions.itemsPerPage = MAX_SUGGESTIONS;

            return nextState;
        }
        case ACTION_CLEAR_SUGGESTIONS: {
            const nextState = Object.assign(new State(), prevState);

            nextState.suggestions = new Results();

            return nextState;
        }
        case ACTION_HANDLE_ERROR: {
            const nextState = new State();

            nextState.view  = VIEW_ERROR;

            return nextState;
        }
    }

    return prevState;
};

export default rootReducer;