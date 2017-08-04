import ConfigComponent from './ConfigComponent';

class Component {
    constructor() {
        this.stateManager = null;
        this.config       = new ConfigComponent();
        this.refs         = {root: null};
        this.bindings     = [];
        this.isMounted    = false;
    }

    configure(options) {
        Object.assign(this.config, options);
    }

    queryDomRefs() {

    }

    bindHandlers() {

    }

    unbindHandlers() {

    }

    mount() {
        this.queryDomRefs();
        this.bindHandlers();
        this.onMount();
    }

    unmount() {
        this.unbindHandlers();
        this.onUnmount();
    }

    shouldUpdate() {
        return true;
    }

    render() {
        return '';
    }
}

export default Component;