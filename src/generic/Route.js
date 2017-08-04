class Route {
    constructor() {
        this.pattern = '';
        this.request = null;
        this.action  = null;

        Object.seal(this);
    }
}

export default Route;