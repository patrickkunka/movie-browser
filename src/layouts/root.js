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
} from '../components';

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
                            if: state => state.hasSuggestions,
                            children: [
                                {
                                    component: Suggestion,
                                    forEach: state => state.suggestions
                                }
                            ]
                        }
                    ]
                },
                {
                    component: SearchResults,
                    if: state => state.isSearchView && state.hasQuery,
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