import {Component} from '../generic';
import iconArrowRight from '../partials/iconArrowRight';

class Pagers extends Component {
    render(state) {
        return (
            `<div class="pagers wrapper wrapper--constrained">
                <a class="pager pager--next" href="/search/?query=${encodeURIComponent(state.results.query)}&page=${state.results.activePage + 1}">Next ${iconArrowRight()}</a>
            </div>`
        );
    }
}

export default Pagers;