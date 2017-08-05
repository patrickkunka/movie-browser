import ConfigComponent from './ConfigComponent';
import EventBinding    from './EventBinding';

class Component {
    constructor(state, parent) {
        this.config       = new ConfigComponent();
        this.refs         = {root: null};
        this.props        = {};
        this.state        = null;
        this.bindings     = [];
        this.stateManager = null;

        this.receiveData(state, parent);
    }

    receiveData(state, parent) {
        this.state = state;

        Object.assign(this.props, parent);
    }

    configure(options) {
        Object.assign(this.config, options);
    }

    queryDomRefs() {
        this.config.refs.reduce((refs, key) => {
            refs[key] = refs.root.querySelector(`[data-ref="${key}"]`);

            return refs;
        }, this.refs);
    }

    bindHandlers() {
        this.bindings.length = 0;
        this.bindings.push(...this.config.events.map(bindingRaw => {
            const binding = Object.assign(new EventBinding(), bindingRaw);
            const handler = this[binding.bind];

            binding.el = binding.ref === '' ? window : this.refs[binding.ref];

            if (!binding.el) throw new TypeError(errorRefNotFound(binding.ref));

            if (typeof handler !== 'function') throw new TypeError(errorHandlerNotFound(binding.bind));

            binding.fn = handler.bind(this);

            binding.el.addEventListener(binding.on, binding.fn);

            return binding;
        }));
    }

    unbindHandlers() {
        this.bindings.forEach(binding => binding.el.removeEventListener(binding.on, binding.fn));
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

    onMount() {

    }

    onUnmount() {

    }

    render() {
        return '';
    }
}

export const errorRefNotFound = (ref) => `[Component] Element reference "${ref}" not found`;
export const errorHandlerNotFound = (bind) => `[Component] Event handler "${bind}" not found`;

export default Component;