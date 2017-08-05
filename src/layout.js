import {
    Footer,
    ErrorMessage,
    Header,
    Main,
    Root,
    SearchForm,
    Suggestions,
    Suggestion,
    SearchResults,
    SearchResult,
    Movie,
    Loader
} from './components';

export default {
    component: Root,
    children: [
        Header,
        {
            component: Main,
            children: [
                {
                    component: SearchForm,
                    if: state => !state.isErrorView,
                    children: [
                        {
                            component: Suggestions,
                            children: [
                                {
                                    component: Suggestion,
                                    forEach: state => state.suggestions.items
                                }
                            ]
                        }
                    ]
                },
                {
                    component: SearchResults,
                    if: state => state.isSearchView && state.hasResults,
                    children: [
                        {
                            component: SearchResult,
                            forEach: state => state.results.items
                        }
                    ]
                },
                {
                    component: Movie,
                    if: state => state.isMovieView
                },
                {
                    component: ErrorMessage,
                    if: state => state.isErrorView
                }
            ]
        },
        Footer,
        Loader
    ]
};