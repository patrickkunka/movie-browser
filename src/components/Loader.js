import {Component} from '../generic';

class Loader extends Component {
    shouldUpdate(nextState) {
        return this.state.isNavigating !== nextState.isNavigating;
    }

    render(state) {
        return `<div class="loader${state.isNavigating ? ' loader--active' : ''}">
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
            <div class="loader__dot"></div>
        </div>`;
    }
}

export default Loader;