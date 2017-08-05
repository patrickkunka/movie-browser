import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE
} from './constants';

import Tmdb from './services/Tmdb';

/**
 * @return {object}
 */

export const beginNavigation = () => ({type: ACTION_BEGIN_NAVIGATION});

/**
 * @param  {Request} request
 * @return {function}
 */

export const navigateToSearch = (request) => () => {
    const query = request.query.query || '';

    return Promise.resolve()
        .then(() => {
            if (!query) return null;

            return Tmdb.searchMovies(query);
        })
        .then(results => {
            return {
                type: ACTION_NAVIGATE_TO_SEARCH,
                query: decodeURIComponent(query),
                results
            };
        });
};

/**
 * @param  {Request} request
 * @return {function}
 */

export const navigateToMovie = (request) => () => {
    const id = request.params.id;

    return Tmdb.getMovie(id)
        .then(movie => {
            return {
                type: ACTION_NAVIGATE_TO_MOVIE,
                movie
            };
        });
};