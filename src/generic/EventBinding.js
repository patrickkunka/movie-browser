class EventBinding {
    constructor() {
        this.ref      = '';
        this.on       = '';
        this.bind     = '';
        this.debounce = -1;
        this.el       = null;
        this.fn       = null;

        Object.seal(this);
    }
}

export default EventBinding;