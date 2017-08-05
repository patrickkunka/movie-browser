import LayoutItem   from './LayoutItem';
import Component    from './Component';
import StateManager from './StateManager';

class Renderer {
    constructor(stateManager) {
        if (!(stateManager instanceof StateManager)) throw new TypeError(ERROR_STATE_MANAGER_NOT_INJECTED);

        this.stateManager = stateManager;

        Object.seal(this);
    }

    /**
     * @param  {object}     state
     * @param  {object}     parent
     * @param  {LayoutItem} node
     * @return {(HTMLElement|DocumentFragment)}
     */

    renderNode(state, parent, node) {
        if (typeof (node.forEach) === 'function') {
            // Multiple nodes

            return this.renderNodeForEach(state, parent, node);
        }

        // Single node

        if (typeof node.if === 'function') {
            // If `if` present and fails, skip

            if (!Boolean(node.if(state, parent))) return document.createTextNode('');
        }

        const Fn = node.component;
        const instance = new Fn(state, parent);
        const temp = document.createElement('div');

        const children = node.children.reduce((frag, child) => {
            frag.appendChild(this.renderNode(state, instance.props || {}, child));

            return frag;
        }, document.createDocumentFragment());

        let html    = '';
        let el      = null;
        let marker  = null;

        if (instance instanceof Component) {
            // Else, class style

            html = instance.render(state, instance.props, CHILD_MARKER);

            // Give each component access to the application state manager

            instance.stateManager = this.stateManager;

            // Add a reference to instance in the layout tree

            node.instances.push(instance);
        } else {
            // Assume pure function style

            html = node.component(state, parent, CHILD_MARKER);
        }

        temp.innerHTML = html;

        el = temp.firstElementChild;

        marker = el.querySelector(CHILD_MARKER_SELECTOR);

        if (marker) {
            el.replaceChild(children, marker);
        }

        if (instance instanceof Component) {
            instance.refs.root = el;

            instance.mount();
        }

        return el;
    }

    /**
     * @param  {object} state
     * @param  {object} parent
     * @param  {LayoutItem} node
     * @return {DocumentFragment}
     */

    renderNodeForEach(state, parent, node) {
        const iterable = node.forEach(state, parent);
        const frag = document.createDocumentFragment();

        if (iterable && Array.isArray(iterable)) {
            return iterable.reduce((frag, item) => {
                frag.appendChild(this.renderNode(state, item, {
                    component: node.component,
                    children: node.children,
                    instances: node.instances
                }));

                return frag;
            }, document.createDocumentFragment());
        }

        return frag;
    }

    static buildTreeFromNode(layoutItemRaw) {
        const layoutItem = new LayoutItem();

        if (typeof layoutItemRaw === 'function') {
            // Short hand (function/class) style

            layoutItem.component = layoutItemRaw;
        } else {
            // Object style

            Object.assign(layoutItem, layoutItemRaw);

            layoutItem.children = layoutItem.children.map(Renderer.buildTreeFromNode);
        }

        return layoutItem;
    }
}

const CHILD_MARKER          = '<div id="child-marker"></div>';
const CHILD_MARKER_SELECTOR = '#child-marker';

export const ERROR_STATE_MANAGER_NOT_INJECTED = '[StateManager] State manager must be injected';

export default Renderer;