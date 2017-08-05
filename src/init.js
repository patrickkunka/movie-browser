import {App}   from './generic';

import config  from '../config';

import routes  from './routes';
import layout  from './layouts/root';
import reducer from './reducers';
import Tmdb    from './services/Tmdb';

Tmdb.setApiKey(config.tmdbApiKey);

const app = new App({
    routes,
    layout,
    reducer
});

app.start(window.location.pathname + window.location.search)
    .then(() => {
        console.log(app.stateManager.getState(), app.root);
    })
    .catch(err => console.error(err));
