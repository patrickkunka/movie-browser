import ConfigApp    from './ConfigApp';
import Router       from './Router';
import StateManager from './StateManager';
import Renderer     from './Renderer';

class App {
    constructor(options={}) {
        this.config       = Object.assign(new ConfigApp(), options);

        this.router       = new Router(this.config.routes);
        this.stateManager = new StateManager(this.router, this.config.reducer);
        this.renderer     = new Renderer(this.config.layout);

        this.root = Renderer.buildTreeFromNode(this.config.layout);

        Object.seal(this);
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
                const rootEl = Renderer.renderNode(initialState, {}, this.root);

                document.body.appendChild(rootEl);
            });
    }
}

export default App;