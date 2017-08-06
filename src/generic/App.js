import ConfigApp    from './ConfigApp';
import Router       from './Router';
import StateManager from './StateManager';
import Renderer     from './Renderer';

/**
 * A wrapper class holding discreet instances of an "app",
 * providing plumbing between internal services and the primary
 * consumer entry point.
 */

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
            .then(() => this.attach());
    }

    /**
     * Attaches the in-memory layout tree to the DOM by inserting it into
     * a provided element, or the body if not provided.
     *
     * @param {HTMLElement} [parent=document.body]
     * @return {void}
     */

    attach(parent=document.body) {
        const rootEl = this.renderer.getRootEl();

        parent.insertBefore(rootEl, parent.lastElementChild);
    }
}

export default App;