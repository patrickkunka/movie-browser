import {Component} from '../generic';

class Movie extends Component {
    render(state, props, children) {
        return (
            `<section class="movie">
                ${children}
            </section>`
        );
    }
}

export default Movie;