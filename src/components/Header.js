import {Component} from '../generic';

class Header extends Component {
    shouldUpdate() {
        return false;
    }

    render() {
        return (
            `<header class="header">
                <div class="wrapper wrapper--constrained">
                    <a href="/" class="header__title">TMDB Movie Browser</a>
                </div>
            </header>`
        );
    }
}

export default Header;