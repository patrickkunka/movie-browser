import {Component} from '../generic';

class Movie extends Component {
    render(state) {
        return (
            `<section class="movie">
                <h1 class="movie__title">${state.movie.original_title}</h1>
            </section>`
        );
    }
}

export default Movie;