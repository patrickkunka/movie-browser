import ConfigComponent from './ConfigComponent';
import EventBinding    from './EventBinding';
import Util            from './Util';

/**
 * An abstract base class for consumer components to enherit from. Abstracts
 * away DOM ref querying, event binding/unbinding and component lifecycle.
 */

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

    /**
     * Receives the application state, and any parent props on instantiation.
     * May be overwritten with a consumer mapping method if required.
     *
     * @param  {object} state
     * @param  {object} parent
     * @return {void}
     */

    receiveData(state, parent) {
        this.state = state;

        Object.assign(this.props, parent);
    }

    /**
     * Configures the component's events and DOM refs as required.
     *
     * @param  {object} options
     * @return {void}
     */

    configure(options) {
        Object.assign(this.config, options);
    }

    /**
     * Queries the component DOM for seletors matching any 'refs' provided via
     * configuration. Element references are then available
     * via `this.refs` and to event bindings.
     *
     * @return {void}
     */

    queryDomRefs() {
        this.config.refs.reduce((refs, key) => {
            refs[key] = refs.root.querySelector(`[data-ref="${key}"]`);

            return refs;
        }, this.refs);
    }

    /**
     * Binds events to handlers as specified in the events array passed
     * to `this.configure()`. Called on component mount.
     *
     * @return {void}
     */

    bindHandlers() {
        this.bindings.length = 0;
        this.bindings.push(...this.config.events.map(bindingRaw => {
            const binding = Object.assign(new EventBinding(), bindingRaw);
            const handler = this[binding.bind];
            const eventTypes = Array.isArray(binding.on) ? binding.on : [binding.on];

            binding.el = binding.ref === '' ? window : this.refs[binding.ref];

            if (!binding.el) throw new TypeError(errorRefNotFound(binding.ref));

            if (typeof handler !== 'function') throw new TypeError(errorHandlerNotFound(binding.bind));

            binding.fn = handler.bind(this);

            if (binding.debounce > 0) {
                binding.fn = Util.debounce(binding.fn, binding.debounce);
            }

            eventTypes.forEach(type => binding.el.addEventListener(type, binding.fn));

            return binding;
        }));
    }

    /**
     * Unbinds event handlers on component unmount.
     *
     * @return {void}
     */

    unbindHandlers() {
        this.bindings.forEach(binding => {
            const eventTypes = Array.isArray(binding.on) ? binding.on : [binding.on];

            eventTypes.forEach(type => binding.el.removeEventListener(type, binding.fn));
        });
    }

    /**
     * Mounts the component by querying DOM refs and binding event handlers.
     *
     * @return {void}
     */

    mount() {
        this.queryDomRefs();
        this.bindHandlers();
        this.onMount();
    }

    /**
     * Unmounts the component by unbinding event handlers.
     *
     * @return {void}
     */

    unmount() {
        this.unbindHandlers();
        this.onUnmount();
    }

    /**
     * Determines whether the component should update in response to a change in state.
     * Can be overwritten by a consumer method to implement per-component
     * rendering optimisations.
     *
     * @param  {object} state
     * @param  {object} parent
     * @return {boolean}
     */

    shouldUpdate() {
        return true;
    }

    /**
     * Allows for consumer provided functionality to be called on mount.
     *
     * @return {void}
     */

    onMount() {
         // Placeholder
    }

    /**
     * Allows for consumer provided functionality to be called on unmount.
     *
     * @return {void}
     */

    onUnmount() {
        // Placeholder
    }

    /**
     * Renders the component DOM. Must return a string representing
     * one HTML element.
     *
     * @param  {object} state
     * @param  {object} props
     * @param  {string} children
     * @return {string}
     */

    render() {
        return '';
    }
}

export const errorRefNotFound = (ref) => `[Component] Element reference "${ref}" not found`;
export const errorHandlerNotFound = (bind) => `[Component] Event handler "${bind}" not found`;

export default Component;