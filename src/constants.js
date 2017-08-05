export const VIEW_ERROR  = 'VIEW_ERROR';
export const VIEW_MOVIE  = 'VIEW_MOVIE';
export const VIEW_SEARCH = 'VIEW_SEARCH';

export const ACTION_BEGIN_NAVIGATION        = Symbol('ACTION_BEGIN_NAVIGATION');
export const ACTION_BEGIN_FETCH_SUGGESTIONS = Symbol('ACTION_BEGIN_FETCH_SUGGESTIONS');
export const ACTION_CLEAR_SUGGESTIONS       = Symbol('ACTION_CLEAR_SUGGESTIONS');
export const ACTION_HANDLE_ERROR            = Symbol('ACTION_HANDLE_ERROR');
export const ACTION_NAVIGATE_TO_SEARCH      = Symbol('ACTION_NAVIGATE_TO_SEARCH');
export const ACTION_NAVIGATE_TO_MOVIE       = Symbol('ACTION_NAVIGATE_TO_MOVIE');
export const ACTION_RECEIVE_SUGGESTIONS     = Symbol('ACTION_RECEIVE_SUGGESTIONS');

export const RESULTS_PER_PAGE = 20;
export const MAX_SUGGESTIONS = 6;

export const BANNER_IMAGE_ROOT = 'https://image.tmdb.org/t/p/w1000';
export const POSTER_IMAGE_ROOT = 'https://image.tmdb.org/t/p/w500';