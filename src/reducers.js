import State from './models/State';

import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE,
    VIEW_SEARCH,
    VIEW_MOVIE
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
            nextState.query = action.query;

            if (action.results) {
                nextState.results.items = action.results.results;
                nextState.results.totalResults = action.results.total_results;
                nextState.results.itemsPerPage = 20;
            }

            return nextState;
        }
    }

    return prevState;
};

export default rootReducer;