import {Component} from '../generic';

class SearchForm extends Component {
    constructor() {
        super(...arguments);

        this.configure({
            refs: ['input'],
            events: [
                {
                    ref: 'root',
                    on: 'submit',
                    bind: 'handleSubmit'
                }
            ]
        });
    }

    handleSubmit(e) {
        const query = encodeURIComponent(this.refs.input.value);

        e.preventDefault();

        this.stateManager.navigate(`/search/?query=${query}`)
            .catch(err => console.error(err));
    }

    render(state, props, children) {
        return (
            `<form class="search-form">
                <div class="search-form__field">
                    <input type="text" placeholder="Search..." data-ref="input" value="${state.query}" required/>
                </div>

                ${children}
            </form>`
        );
    }
}

export default SearchForm;