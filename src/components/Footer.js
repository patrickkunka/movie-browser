import {Component} from '../generic';

class Footer extends Component {
    constructor() {
        super(...arguments);

        this.props.currentYear = new Date().getFullYear();
    }

    shouldUpdate() {
        return false;
    }

    render(state, props) {
        return (
            `<footer class="footer">
                <div class="footer__wrapper wrapper wrapper--constrained">
                    <div class="footer__attribution">
                        Powered by <a target="_blank" href="https://www.themoviedb.org">The Movie Database</a>
                    </div>

                    <div class="footer__copyright"><a href="https://github.com/patrickkunka/movie-browser/" target="_blank">View on GitHub</a> <span class="footer__separator"></span> &copy; Patrick Kunka ${props.currentYear}</div>
                </div>
            </footer>`
        );
    }
}

export default Footer;