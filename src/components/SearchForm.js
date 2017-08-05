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

        this.configure({
            refs: ['input'],
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
                    debounce: 300
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
        return this.state.results.query !== nextState.results.query;
    }

    /**
     * @param  {SubmitEvent} e
     * @return {void}
     */

    handleSubmit(e) {
        const query = encodeURIComponent(this.refs.input.value.trim());

        e.preventDefault();

        this.props.hasTyped = false;

        this.stateManager.dispatch(beginNavigation)
            .then(() => this.stateManager.navigate(`/search/?query=${query}`))
            .catch(err => console.error(err));
    }

    /**
     * @return {void}
     */

    handleInputValueChange() {
        const query = this.refs.input.value.trim();
        const state = this.stateManager.getState();
        const hasSuggestions = state.suggestions.items.length > 0;

        if (
            state.isFetchingSuggestions ||
            !hasSuggestions && query.length < MIN_AUTO_QUERY_LENGTH ||
            (state.results.query === query && !this.props.hasTyped)
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

                return this.stateManager.dispatch(beginFetchSuggestions)
                    .then(() => this.stateManager.dispatch(receiveSuggestions, query));
            })
            .catch(err => console.error(err));
    }

    /**
     * @return {void}
     */

    handleBlur() {
        this.stateManager.dispatch(clearSuggestions)
            .catch(err => console.error(err));
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

export default SearchForm;