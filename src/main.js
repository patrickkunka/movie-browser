import {App}   from './generic';
import {ERROR_INVALID_ROUTE} from './generic/Router';

import config  from '../config';
import routes  from './routes';
import layout  from './layout';
import reducer from './reducers';
import Tmdb    from './services/Tmdb';

import {handleError} from './actions';

// Set up TMDB API key

Tmdb.setApiKey(config.tmdbApiKey);

// Create an instance of `App`, providing it with all neccessary
// consumer components

const app = new App({
    routes,
    layout,
    reducer
});

const PATH = window.location.pathname + window.location.search;

function removeLoader() {
    // App has loaded, delete the hard-coded temporary loader

    const loader = document.getElementById('loader');

    if (loader) document.body.removeChild(loader);
}

// Start up the app by providing it with the initial path

app.start(PATH)
    .then(removeLoader)
    .catch(err => {
        switch (err.message) {
            case ERROR_INVALID_ROUTE:
                removeLoader();

                return app.stateManager.dispatch(handleError).then(() => app.attach());
            default:
                console.error(err);
        }
    });
