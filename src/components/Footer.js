import {Component} from '../generic';

class Footer extends Component {
    shouldUpdate() {
        return false;
    }

    render() {
        return '<footer class="footer"></footer>';
    }
}

export default Footer;