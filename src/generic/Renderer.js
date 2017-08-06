import LayoutItem   from './LayoutItem';
import Component    from './Component';
import StateManager from './StateManager';

const STATUS_ADDED    = Symbol('STATUS_ADDED');
const STATUS_UDPATED  = Symbol('STATUS_UPDATED');
const STATUS_REMOVED  = Symbol('STATUS_REMOVED');
const STATUS_INACTIVE = Symbol('STATUS_INACTIVE');
const STATUS_ACTIVE   = Symbol('STATUS_ACTIVE');

/**
 * Builds or traverses the application layout tree whenever a
 * change of state occurs. Manages the lifecycle of each
 * component within the tree.
 */

class Renderer {
    constructor(stateManager) {
        if (!(stateManager instanceof StateManager)) throw new TypeError(ERROR_STATE_MANAGER_NOT_INJECTED);

        this.stateManager = stateManager;
        this.root = null;

        stateManager.renderer = this;

        Object.seal(this);
    }

    /**
     * Renders one or more components for a provided layout item,
     * against the application state.
     *
     * @param  {object}     state
     * @param  {object}     parent
     * @param  {LayoutItem} layoutItem
     * @return {(HTMLElement|DocumentFragment)}
     */

    renderComponent(state, parent, layoutItem) {
        if (!Renderer.shouldRenderComponent(state, parent, layoutItem)) {
            // Component should not be rendered, return empty text node

            return document.createTextNode('');
        }

        if (typeof (layoutItem.forEach) === 'function') {
            // Render multiple components

            return this.renderComponentForEach(state, parent, layoutItem);
        }

        // Render single component

        const Fn = layoutItem.component;
        const instance = new Fn(state, parent);
        const temp = document.createElement('div');

        const children = layoutItem.children.reduce((frag, child) => {
            frag.appendChild(this.renderComponent(state, instance.props || {}, child));

            return frag;
        }, document.createDocumentFragment());

        let html    = '';
        let el      = null;
        let marker  = null;

        if (instance instanceof Component) {
            // Class style

            html = instance.render(state, instance.props, CHILD_MARKER);

            // Give each component access to the application state manager

            instance.stateManager = this.stateManager;

            // Add a reference to instance in the layout tree

            layoutItem.instances.push(instance);
        } else {
            // Else, assume pure function style

            html = layoutItem.component(state, parent, CHILD_MARKER);
        }

        temp.innerHTML = html;

        el = temp.firstElementChild;

        marker = el.querySelector(CHILD_MARKER_SELECTOR);

        if (marker) {
            marker.parentElement.replaceChild(children, marker);
        }

        if (instance instanceof Component) {
            instance.refs.root = el;

            instance.mount();
        }

        return el;
    }

    /**
     * Renders multiple components for a LayoutItem
     * representing an array of data.
     *
     * @param  {object}     state
     * @param  {object}     parent
     * @param  {LayoutItem} layoutItem
     * @return {DocumentFragment}
     */

    renderComponentForEach(state, parent, layoutItem) {
        const iterable = layoutItem.forEach(state, parent);
        const frag = document.createDocumentFragment();

        if (iterable && Array.isArray(iterable)) {
            return iterable.reduce((frag, item) => {
                frag.appendChild(this.renderComponent(state, item, {
                    component: layoutItem.component,
                    children: layoutItem.children,
                    instances: layoutItem.instances
                }));

                return frag;
            }, document.createDocumentFragment());
        }

        return frag;
    }

    /**
     * Determines if and how a component should be updated in response to
     * a change in application state.
     *
     * @param   {object}      state
     * @param   {object}      parent
     * @param   {Layoutitem}  layoutItem
     * @return  {boolean}
     */

    updateComponent(state, parent, layoutItem) {
        if (!Renderer.shouldRenderComponent(state, parent, layoutItem)) {
            if (layoutItem.isMounted) {
                // REMOVED

                Renderer.unmountComponents(layoutItem).forEach(el => el.parentElement.removeChild(el));

                return STATUS_REMOVED;
            }

            // INACTIVE

            return STATUS_INACTIVE;
        }

        if (layoutItem.isMounted && Renderer.shouldUpdateComponent(state, parent, layoutItem)) {
            // UPDATED

            this.replaceComponent(state, parent, layoutItem);

            return STATUS_UDPATED;
        } else if (layoutItem.isMounted) {
            // ACTIVE

            const instance = layoutItem.instances[0];

            const statuses = layoutItem.children.map(item => this.updateComponent(state, instance.props, item));

            this.insertChildComponents(state, parent, layoutItem, statuses);

            return STATUS_ACTIVE;
        }

        // ADDED

        this.renderComponent(state, parent, layoutItem);

        return STATUS_ADDED;
    }

    /**
     * Re-renders an updated component and replaces its root
     * element in the DOM.
     *
     * @param {object} state
     * @param {object} parent
     * @param {layoutItem} layoutItem
     */

    replaceComponent(state, parent, layoutItem) {
        const prevElements = Renderer.unmountComponents(layoutItem);
        const nextElements = this.renderComponent(state, parent, layoutItem);
        const ElementToReplace = prevElements[0];

        while (prevElements.length > 1) {
            let el = prevElements.pop();

            el.parentElement.removeChild(el);
        }

        ElementToReplace.parentElement.replaceChild(nextElements, ElementToReplace);
    }

    /**
     * Determines if any new children were added to an existing mounted
     * component, and if so, inserts them into the DOM next to an
     * existing sibling, or re-renders the parent.
     *
     * @param  {object}         state
     * @param  {parent}         parent
     * @param  {LayoutItem}     layoutItem
     * @param  {Array.<Symbol>} childStatuses
     * @return {void}
     */

    insertChildComponents(state, parent, layoutItem, childStatuses) {
        const addedIndex  = childStatuses.indexOf(STATUS_ADDED);
        const activeIndex = childStatuses.indexOf(STATUS_ACTIVE);

        if (addedIndex < 0) {
            // No children added

            return;
        }

        if (activeIndex < 0) {
            // No active children exist, parent must be re-rendered;

            this.replaceComponent(state, parent, layoutItem);

            return;
        }

        const childMarker = document.createElement('div');
        const frag = document.createDocumentFragment();
        const activeElement = this.getRootEl(layoutItem.children[activeIndex]);

        // Insert childMarker into DOM after any active element

        activeElement.parentElement.insertBefore(childMarker, activeElement);

        // Push all mounted elements into the frag

        childStatuses.forEach((status, i) => {
            if ([STATUS_ACTIVE, STATUS_ADDED].indexOf(status) > -1) {
                frag.appendChild(this.getRootEl(layoutItem.children[i]));
            }
        });

        // Replace childMarker with frag

        childMarker.parentElement.replaceChild(frag, childMarker);
    }

    /**
     * Returns the root element of a mounted layout item, defaulting
     * to the tree root if not provided.
     *
     * @param {LayoutItem} [layoutItem=this.root]
     * @return {(HTMLElement|null)}
     */

    getRootEl(layoutItem=this.root) {
        return layoutItem.isMounted ? layoutItem.instances[0].refs.root : null;
    }


    /**
     * @static
     * @param  {LayoutItem} layoutItem
     * @return {Array.<HTMLElement>}
     */

    static unmountComponents(layoutItem) {
        const elements = [];

        layoutItem.instances.forEach(instance => {
            instance.unmount();

            elements.push(instance.refs.root);
        });

        layoutItem.children.forEach(item => Renderer.unmountComponents(item));

        layoutItem.instances.length = 0;

        return elements;
    }

    /**
     * Tests a layout item's `if` and `forEach` functions to determine if its
     * component should be rendered for the current state.
     *
     * @static
     * @param  {object}     state
     * @param  {object}     parent
     * @param  {LayoutItem} layoutItem
     * @return {boolean}
     */

    static shouldRenderComponent(state, parent, layoutItem) {
        let fn = null;

        if (typeof (fn = layoutItem.if) === 'function' && !Boolean(fn(state, parent))) {
            return false;
        } else if (typeof (fn = layoutItem.forEach) === 'function') {
            const iterable = fn(state, parent);

            if (!Array.isArray(iterable) || iterable.length < 1) return false;
        }

        return true;
    }

    /**
     * Tests an existing component's `shouldUpdate` function to determine
     * if it should be re-rendered in response to a new state.
     *
     * @static
     * @param  {object}     state
     * @param  {object}     parent
     * @param  {LayoutItem} layoutItem
     * @return {boolean}
     */

    static shouldUpdateComponent(state, parent, layoutItem) {
        for (let i = 0, instance; (instance = layoutItem.instances[i]); i++) {
            if (instance.shouldUpdate(state, parent)) return true;
        }

        return false;
    }

    /**
     * Recursively builds up the application view from
     * consumer-provided layout items.
     *
     * @static
     * @param  {object} layoutItemRaw
     * @return {void}
     */

    static buildTreeFromLayoutItem(layoutItemRaw) {
        const layoutItem = new LayoutItem();

        if (typeof layoutItemRaw === 'function') {
            // Short hand (function/class) style

            layoutItem.component = layoutItemRaw;
        } else {
            // Object style

            Object.assign(layoutItem, layoutItemRaw);

            layoutItem.children = layoutItem.children.map(Renderer.buildTreeFromLayoutItem);
        }

        return layoutItem;
    }
}

const CHILD_MARKER          = '<div id="child-marker"></div>';
const CHILD_MARKER_SELECTOR = '#child-marker';

export const ERROR_STATE_MANAGER_NOT_INJECTED = '[StateManager] State manager must be injected';

export default Renderer;