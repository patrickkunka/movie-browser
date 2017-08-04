class Request {
    constructor() {
        this.params  = {};
        this.query   = {};
        this.path    = '';

        Object.seal(this);
    }
}

export default Request;