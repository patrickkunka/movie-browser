class LayoutItem {
    constructor() {
        this.component = null;
        this.if        = null;
        this.forEach   = null;
        this.children  = [];
        this.instances = [];

        Object.seal(this);
    }

    get isMounted() {
        return this.instances.length > 0;
    }
}

export default LayoutItem;