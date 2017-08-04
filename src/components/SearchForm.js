import {Component} from '../generic';

class SearchForm extends Component {
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