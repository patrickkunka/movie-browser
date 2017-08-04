import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE
} from './constants';

/**
 * @return {object}
 */

export const beginNavigation = () => ({type: ACTION_BEGIN_NAVIGATION});

/**
 * @param  {Route} route
 * @return {function}
 */

export const navigateToSearch = (route) => () => {
    return Promise.resolve()
        .then(() => {
            return {
                type: ACTION_NAVIGATE_TO_SEARCH
            };
        });
};

/**
 * @param  {Route} route
 * @return {function}
 */

export const navigateToMovie = (route) => () => {
    return Promise.resolve()
        .then(() => {
            return {
                type: ACTION_NAVIGATE_TO_MOVIE
            };
        });
};