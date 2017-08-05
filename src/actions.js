import {
    ACTION_BEGIN_NAVIGATION,
    ACTION_BEGIN_FETCH_SUGGESTIONS,
    ACTION_CLEAR_SUGGESTIONS,
    ACTION_HANDLE_ERROR,
    ACTION_NAVIGATE_TO_SEARCH,
    ACTION_NAVIGATE_TO_MOVIE,
    ACTION_RECEIVE_SUGGESTIONS
} from './constants';

import Tmdb from './services/Tmdb';

/**
 * @return {object}
 */

export const beginNavigation = () => ({type: ACTION_BEGIN_NAVIGATION});

/**
 * @return {object}
 */

export const beginFetchSuggestions = () => ({type: ACTION_BEGIN_FETCH_SUGGESTIONS});

/**
 * @return {object}
 */

export const clearSuggestions = () => ({type: ACTION_CLEAR_SUGGESTIONS});

/**
 * @return {object}
 */

export const handleError = () => ({type: ACTION_HANDLE_ERROR});

/**
 * @param  {Request} request
 * @return {function}
 */

export const navigateToSearch = (request) => () => {
    const query = request.query.query || '';
    const page  = parseInt(request.query.page || 1);

    return Promise.resolve()
        .then(() => {
            if (!query) return null;

            return Tmdb.searchMovies(query, page);
        })
        .then(results => {
            return {
                type: ACTION_NAVIGATE_TO_SEARCH,
                query: decodeURIComponent(query),
                page,
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
        })
        .catch(handleError);
};

/**
 * @param  {strig} query
 * @return {function}
 */

export const receiveSuggestions = (query) => () => {
    return Tmdb.searchMovies(query)
        .then(suggestions => {
            return {
                type: ACTION_RECEIVE_SUGGESTIONS,
                query,
                suggestions
            };
        });
};