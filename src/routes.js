import {
    navigateToSearch,
    navigateToMovie
} from './actions';

export default [
    {
        pattern: '/',
        action: navigateToSearch
    },
    {
        pattern: '/search/',
        action: navigateToSearch
    },
    {
        pattern: '/:slug/',
        action: navigateToMovie
    }
];