class ConfigComponent {
    constructor() {
        this.events = [];
        this.refs   = [];

        Object.seal(this);
    }
}

export default ConfigComponent;