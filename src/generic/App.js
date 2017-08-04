import Config       from './Config';
import Router       from './Router';
import StateManager from './StateManager';

class App {
    constructor(options={}) {
        this.config       = new Config();
        this.router       = null;
        this.stateManager = null;
        this.navigator    = null;
        this.renderer     = null;

        Object.seal(this);

        this.init(options);
    }

    /**
     * Merges consumer-provided components and initialises internal
     * components.
     *
     * @param  {object} options
     * @return {void}
     */

    init(options) {
        Object.assign(this.config, options);

        this.router = new Router();

        this.router.init(this.config.routes);

        this.stateManager = new StateManager(this.router, this.config.reducer);
    }

    /**
     * Starts up the application by creating an initial state and rendering the
     * resulting DOM into the document <body>.
     *
     * @param  {*} url
     * @return {Promise}
     */

    start(url) {
        return this.stateManager.init(url)
            .then(initialState => {
                // TODO: render view against state
            });
    }
}

export default App;