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
    SearchResultsInfo,
    SearchResult,
    Movie,
    MovieBanner,
    MovieStats,
    Loader,
    Pagers
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
                    if: state => state.isSearchView,
                    children: [
                        {
                            component: SearchResultsInfo,
                            if: state => state.results.hasQuery
                        },
                        {
                            component: SearchResult,
                            forEach: state => state.results.items
                        }
                    ]
                },
                {
                    component: Pagers,
                    if: state => state.isSearchView && state.results.hasMultiplePages && !state.results.isLastPage
                },
                {
                    component: Movie,
                    if: state => state.isMovieView,
                    children: [
                        MovieBanner,
                        MovieStats
                    ]
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