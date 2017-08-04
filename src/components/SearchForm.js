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
        e.preventDefault();

        console.log(this.refs.input.value);
    }

    render(state, props, children) {
        return (
            `<form class="search-form">
                <div class="search-form__field">
                    <input type="text" placeholder="Search..." data-ref="input" value="${state.query}"/>
                </div>

                ${children}
            </form>`
        );
    }
}

export default SearchForm;