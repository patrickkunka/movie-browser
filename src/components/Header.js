import {Component} from '../generic';

class Header extends Component {
    shouldUpdate() {
        return false;
    }

    render() {
        return (
            `<header class="header">
                <a href="/">Home</a>
            </header>`
        );
    }
}

export default Header;