class Tmdb {
    /**
     * Searches for movies matching the provided query.
     *
     * @param  {string} query
     * @return {Promise.<object>}
     */

    static searchMovies(query) {
        return fetch(`${API_PATH}search/movie?api_key=${API_KEY}&query=${query}`)
            .then(response => response.json());
    }

    /**
     * Retrieves a movie by its ID.
     *
     * @param  {string} id
     * @return {Promise.<object>}
     */

    static getMovie(id) {
        return fetch(`${API_PATH}movie/${id}?api_key=${API_KEY}`)
            .then(response => {
                if (!response.ok) throw new Error(ERROR_MOVIE_NOT_FOUND);

                return response.json();
            });
    }

    static setApiKey(apiKey) {
        API_KEY = apiKey;
    }
}

const API_PATH = 'http://api.themoviedb.org/3/';
let   API_KEY  = '';

export const ERROR_MOVIE_NOT_FOUND = '[Tmdb#getMovie()] No movie could be found matching the provided ID';

export default Tmdb;