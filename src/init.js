import {App}   from './generic';
import {ERROR_NOT_FOUND} from './generic/Router';

import config  from '../config';
import routes  from './routes';
import layout  from './layout';
import reducer from './reducers';
import Tmdb    from './services/Tmdb';

import {handleError} from './actions';

Tmdb.setApiKey(config.tmdbApiKey);

const app = new App({
    routes,
    layout,
    reducer
});

app.start(window.location.pathname + window.location.search)
    .catch(err => {
        switch (err.message) {
            case ERROR_NOT_FOUND:
                return app.stateManager.dispatch(handleError).then(() => app.attach());
            default:
                console.error(err);
        }
    });
