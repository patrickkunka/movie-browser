import {Component} from '../generic';
import iconMovie from '../partials/iconMovie';

class Header extends Component {
    shouldUpdate() {
        return false;
    }

    render() {
        return (
            `<header class="header">
                <div class="header__wrapper wrapper wrapper--constrained">
                    <a href="/" class="header__title"><span class="header__logo">${iconMovie()}</span> <span>TMDB Movie Browser</span></a>
                </div>
            </header>`
        );
    }
}

export default Header;