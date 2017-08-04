import State from './models/State';

import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE,
    VIEW_SEARCH,
    VIEW_MOVIE
} from './constants';

const rootReducer = (prevState, action) => {
    const nextState = Object.assign(new State(), prevState);

    switch (action.type) {
        case ACTION_BEGIN_NAVIGATION:
            nextState.isNavigating = true;

            break;
        case ACTION_NAVIGATE_TO_MOVIE:
            nextState.isNavigating = false;
            nextState.view = VIEW_MOVIE;

            break;
        case ACTION_NAVIGATE_TO_SEARCH:
            nextState.isNavigating = false;
            nextState.view = VIEW_SEARCH;
    }

    return nextState;
};

export default rootReducer;