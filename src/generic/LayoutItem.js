class LayoutItem {
    constructor() {
        this.component = null;
        this.if        = null;
        this.forEach   = null;
        this.children  = [];
        this.instances = [];

        Object.seal(this);
    }
}

export default LayoutItem;