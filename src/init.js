import {App}   from './generic';

import routes  from './routes';
import layout  from './layouts/root';
import reducer from './reducers';

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
