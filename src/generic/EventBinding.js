class EventBinding {
    constructor() {
        this.ref    = '';
        this.on     = '';
        this.bind   = '';
        this.el     = null;
        this.fn     = null;

        Object.seal(this);
    }
}

export default EventBinding;