import ConfigComponent from './ConfigComponent';

class Component {
    constructor(state, parent) {
        this.config       = new ConfigComponent();
        this.refs         = {root: null};
        this.props        = {};
        this.state        = null;
        this.bindings     = [];

        this.receiveData(state, parent);
    }

    receiveData(state, parent) {
        this.state = state;
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