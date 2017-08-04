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
 * @param  {Request} request
 * @return {function}
 */

export const navigateToSearch = (request) => () => {
    const query = request.query.query;

    return Promise.resolve()
        .then(() => {
            return {
                type: ACTION_NAVIGATE_TO_SEARCH
            };
        });
};

/**
 * @param  {Request} request
 * @return {function}
 */

export const navigateToMovie = (request) => () => {
    const slug = request.params.slug;

    // TODO: Call API with slug

    return Promise.resolve()
        .then(() => {
            return {
                type: ACTION_NAVIGATE_TO_MOVIE
            };
        });
};