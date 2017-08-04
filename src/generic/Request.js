class Request {
    constructor() {
        this.path        = '';
        this.queryString = '';
        this.params      = {};
        this.query       = {};

        Object.seal(this);
    }
}

export default Request;