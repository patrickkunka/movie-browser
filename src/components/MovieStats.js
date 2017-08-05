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
                            <td>${Helpers.statsList(state.movie.genres)}</td>
                        </tr>
                        <tr>
                            <th>Languages</th>
                            <td>${Helpers.statsList(state.movie.spoken_languages)}</td>
                        </tr>
                        <tr>
                            <th>Year of Release</th>
                            <td>${Helpers.year(state.movie.release_date)}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>${state.movie.status}</td>
                        </tr>
                        <tr>
                            <th>Production Countries</th>
                            <td>${Helpers.statsList(state.movie.production_countries)}</td>
                        </tr>
                        <tr>
                            <th>Production Companies</th>
                            <td>${Helpers.statsList(state.movie.production_companies)}</td>
                        </tr>
                    </tbody>
                </table>

                ${state.movie.homepage ? `<a class="movie-stats__link" target="_blank" href="${state.movie.homepage}">Visit website</a>` : ''}
            </div>`
        );
    }
}

export default MovieStats;