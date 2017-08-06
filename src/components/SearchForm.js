import {Component} from '../generic';

import {
    beginFetchSuggestions,
    beginNavigation,
    receiveSuggestions,
    clearSuggestions
} from '../actions';

class SearchForm extends Component {
    constructor() {
        super(...arguments);

        this.props.hasTyped = false;
        this.props.focussedSuggestionIndex = -1;

        this.configure({
            refs: ['input', 'suggestions'],
            events: [
                {
                    ref: 'root',
                    on: 'submit',
                    bind: 'handleSubmit'
                },
                {
                    ref: 'input',
                    on: ['keypress', 'input'],
                    bind: 'handleInputValueChange',
                    debounce: 150
                },
                {
                    ref: 'input',
                    on: ['keydown'],
                    bind: 'handleInputKeydown'
                },
                {
                    ref: 'input',
                    on: ['blur'],
                    bind: 'handleBlur'
                }
            ]
        });
    }

    /**
     * @param  {State} nextState
     * @return {boolean}
     */

    shouldUpdate(nextState) {
        return this.state.results.query !== nextState.results.query || this.state.view !== nextState.view;
    }

    /**
     * @param  {SubmitEvent} e
     * @return {void}
     */

    handleSubmit(e) {
        const state = this.stateManager.getState();
        const query = encodeURIComponent(this.refs.input.value.trim());

        let destination = `/search/?query=${query}`;

        this.props.hasTyped = false;

        if (this.props.focussedSuggestionIndex > -1) {
            const suggestion = state.suggestions.items[this.props.focussedSuggestionIndex];

            destination = `/${suggestion.id}/`;

            if (!state.results.hasQuery) {
                // Clear value

                this.refs.input.value = '';
            }
        }

        e.preventDefault();

        this.stateManager.dispatch(beginNavigation)
            .then(() => this.stateManager.navigate(destination))
            .catch(err => console.error(err));
    }

    /**
     * @return {void}
     */

    handleInputValueChange(e) {
        const query = this.refs.input.value.trim();
        const state = this.stateManager.getState();
        const hasSuggestions = state.suggestions.items.length > 0;

        if (
            state.isFetchingSuggestions ||
            state.isNavigating ||
            !hasSuggestions && query.length < MIN_AUTO_QUERY_LENGTH ||
            (state.results.query === query && !this.props.hasTyped) ||
            e.key === 'Enter'
        ) {
            // Do not perform auto querying under any of the above conditions

            return;
        }

        this.props.hasTyped = true;

        Promise.resolve()
            .then(() => {
                if (hasSuggestions && query.length < MIN_AUTO_QUERY_LENGTH) {
                    // Clear existing suggestions

                    return this.stateManager.dispatch(clearSuggestions);
                }

                // Auto-query new suggestions

                this.props.focussedSuggestionIndex = -1;

                return this.stateManager.dispatch(beginFetchSuggestions)
                    .then(() => this.stateManager.dispatch(receiveSuggestions, query));
            })
            .catch(err => console.error(err));
    }

    /**
     * @param  {KeyboardEvent}
     * @return {void}
     */

    handleInputKeydown(e) {
        const state = this.stateManager.getState();
        const maxIndex = state.suggestions.totalResults - 1;

        if (!state.hasSuggestions) return;

        switch (e.keyCode) {
            case KEYCODE_DOWN:
                this.props.focussedSuggestionIndex = Math.min(maxIndex, this.props.focussedSuggestionIndex + 1);

                break;
            case KEYCODE_UP:
                this.props.focussedSuggestionIndex = Math.max(-1, this.props.focussedSuggestionIndex - 1);

                break;
            default:
                return;
        }

        this.focusSuggestions();
    }

    /**
     * @return {void}
     */

    handleBlur() {
        new Promise(resolve => setTimeout(resolve, BLUR_DELAY))
            .then(() => this.stateManager.dispatch(clearSuggestions))
            .catch(err => console.error(err));
    }

    /**
     * @return {void}
     */

    focusSuggestions() {
        this.queryDomRefs();

        Array.from(this.refs.suggestions.children).forEach((el, i) => {
            el.classList[i === this.props.focussedSuggestionIndex ? 'add' : 'remove'](FOCUSSED_CLASSNAME);
        });
    }

    /**
     * @param  {object} state
     * @param  {object} props
     * @param  {string} children
     * @return {string}
     */

    render(state, props, children) {
        return (
            `<form class="search-form wrapper wrapper--constrained">
                <div class="search-form__field">
                    <input class="search-form__input"
                        type="text" placeholder="Search movies..."
                        data-ref="input"
                        value="${state.results.query}"
                        required/>

                    <div class="search-form__decor"></div>

                    ${children}
                </div>
            </form>`
        );
    }
}

const MIN_AUTO_QUERY_LENGTH = 3;
const BLUR_DELAY            = 200;
const KEYCODE_DOWN          = 40;
const KEYCODE_UP            = 38;
const FOCUSSED_CLASSNAME    = 'search-form__suggestion--focussed';

export default SearchForm;