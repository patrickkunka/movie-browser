import ConfigApp    from './ConfigApp';
import Router       from './Router';
import StateManager from './StateManager';
import Renderer     from './Renderer';

class App {
    constructor(options={}) {
        this.config       = Object.assign(new ConfigApp(), options);

        this.router       = new Router(this.config.routes);
        this.stateManager = new StateManager(this.router, this.config.reducer);
        this.renderer     = new Renderer(this.stateManager);

        this.root = this.renderer.root = Renderer.buildTreeFromLayoutItem(this.config.layout);

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
            .then(() => {
                const rootEl = this.renderer.getRootEl();

                document.body.insertBefore(rootEl, document.body.lastElementChild);
            });
    }
}

export default App;