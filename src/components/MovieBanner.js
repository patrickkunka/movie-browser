import {Component} from '../generic';

import Helpers from '../services/Helpers';

import {
    BANNER_IMAGE_ROOT,
    POSTER_IMAGE_ROOT
} from '../constants';

class MovieBanner extends Component {
    render(state) {
        return (
            `<div class="movie-banner">
                ${state.movie.backdrop_path ? `<img class="movie-banner__backdrop" src="${BANNER_IMAGE_ROOT + state.movie.backdrop_path}"/>` : ''}

                <div class="movie-banner__content">
                    <div class="movie-banner__wrapper wrapper wrapper--constrained">
                        <div class="movie-banner__poster">
                            ${state.movie.poster_path ? `<img class="movie-banner__poster-image" src="${POSTER_IMAGE_ROOT + state.movie.poster_path}"/>` : ''}
                        </div>

                        <div class="movie-banner__text">
                            <h2 class="movie-banner__title">${state.movie.original_title}&nbsp;<span class="movie-banner__year">${Helpers.year(state.movie.release_date)}</span></h2>

                            <p class="movie-banner__overview">${state.movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
}

export default MovieBanner;