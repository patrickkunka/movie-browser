class Config {
    constructor() {
        this.routes  = [];
        this.reducer = null;
        this.layout  = null;

        Object.seal(this);
    }
}

export default Config;