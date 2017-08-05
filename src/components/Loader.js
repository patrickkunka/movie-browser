import {Component} from '../generic';

class Loader extends Component {
    shouldUpdate(nextState) {
        return this.state.isNavigating !== nextState.isNavigating;
    }

    render() {
        return '<div class="loader"></div>';
    }
}

export default Loader;