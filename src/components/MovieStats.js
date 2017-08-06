import {Component} from '../generic';

import Helpers from '../services/Helpers';

class MovieStats extends Component {
    render(state) {
        return (
            `<div class="movie-stats wrapper wrapper--constrained">
                <table class="movie-stats__table">
                    <tbody>
                        <tr>
                            <th>Genres</th>
                            <td><span class="movie-stats__value">${Helpers.statsList(state.movie.genres)}</span></td>
                        </tr>
                        <tr>
                            <th>Languages</th>
                            <td><span class="movie-stats__value">${Helpers.statsList(state.movie.spoken_languages)}</span></td>
                        </tr>
                        <tr>
                            <th>Year of Release</th>
                            <td><span class="movie-stats__value">${Helpers.year(state.movie.release_date)}</span></td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td><span class="movie-stats__value">${state.movie.status}</span></td>
                        </tr>
                        <tr>
                            <th>Production Countries</th>
                            <td><span class="movie-stats__value">${Helpers.statsList(state.movie.production_countries)}</span></td>
                        </tr>
                        <tr>
                            <th>Production Companies</th>
                            <td><span class="movie-stats__value">${Helpers.statsList(state.movie.production_companies)}</span></td>
                        </tr>
                    </tbody>
                </table>

                ${state.movie.homepage ? `<a class="movie-stats__link" target="_blank" href="${state.movie.homepage}">Visit website</a>` : ''}
            </div>`
        );
    }
}

export default MovieStats;