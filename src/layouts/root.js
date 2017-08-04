import {
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
        {
            component: SearchForm,
            if: state => state.isSearchView,
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
                    forEach: state => state.results
                }
            ]
        },
        {
            component: Movie,
            if: state => state.isMovieView
        },
        Loader
    ]
};