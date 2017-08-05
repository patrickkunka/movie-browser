import {Component} from '../generic';

class Pagers extends Component {
    render(state) {
        return (
            `<div class="pagers wrapper wrapper--constrained">
                <a class="pager pager--next" href="/search/?query=${encodeURIComponent(state.results.query)}&page=${state.results.activePage + 1}">Next</a>
            </div>`
        );
    }
}

export default Pagers;