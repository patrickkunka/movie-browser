import {
    Footer,
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
                }
            ]
        },
        Footer,
        Loader
    ]
};