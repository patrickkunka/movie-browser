# Movie Browser

A simple UI for searching [themoviedb.org](https://www.themoviedb.org)'s API.

The app can be viewed at [moviebrowser.kunkalabs.com](http://moviebrowser.kunkalabs.com).

## Overview

This project provides a means of searching for and browsing movies using the TMDB API. A simple user interface is implemented consisting of a "home" view, a "search results" view, and a "movie" view.

The project is split into various business-logic specific UI components and services, and a collection of "generic" components, services and extensible base classes (`./src/generic/`), which can be thought of as a mini framework upon which the application is built.

No third-party frameworks or UI libraries have been used, although several commonly used patterns are implemented:
- Immutable state
- Uni-direction data flow
- Reactive components
- Composable views

Rather than trying to recreate any specific framework, the above ideas and concepts have been taken as inspiration, and implemented in the most lightweight way possible to provide only the functionality needed for the project while also providing an extensible foundation to add more complex functionality if needed.

For example, in lieu of a rich templating language like JSX, views are composed using a "layout tree" (`./src/layout.js`), which also provides a high-level visualisation of the application view structure.

The rendering algorithm used to traverse the layout tree (`./src/generic/Renderer.js`) is fairly simple and does not, for example, include functionality such as virtual DOM diffing or list rendering optimisation, which keeps it relatively light weight. It is still fairly efficient due to the nature of the layout tree where any component and its subtree can be independently re-rendered and replaced in reaction to a change of application state. Components may implement a `shouldUpdate()` hook to diff incoming state and ensure that only the minimal amount of DOM is updated on state change.

Local component state was not critical for this application, so components mostly interact directly with the top-level application state, with the option to receive a parent components "props" if needed.

## Development

This project is written in ES2015+ JavaScript, and bundled for production using Babel and Webpack. The project's `package.json` file provides various NPM scripts for the building and watching of project JavaScript and CSS.

To install all development dependencies, run `npm install` from the project root.

As a pure single page app, no server is required, although a simple [Express](https://expressjs.com/) development server is included to provide a catch-all wildcard route on `localhost:3000`. As the application implements real URLs, this is a requirement if you wish to navigate directly to particular application views and states. In [production](http://moviebrowser.kunkalabs.com) on AWS S3 however, this is achieved via a wildcard-friendly static file server.

To start the development server, run `npm start` from the project root.

All project source code is contained in the `./src/` directory. Upon application build, a `./dist/` directory is created housing the production assets, although this is gitignored.

To build the project, run `npm run build` from the project root.

### TMDB API Key

In order to build a working application, you will need to provide a TMDB API key. This is provided via a gitignored `config.js` file in the project root, which should export an object containing at least the following:

##### ./config.js

```js
module.exports = {
    tmdbApiKey: '<your-tmdb-api-key-here>'
}
```

## Tests

Several unit tests were written early on during development for critical generic components such as `Router.js` and `StateManager.js`. The [Mocha](https://mochajs.org/) testing framework is used with the [Chai](http://chaijs.com/) assertion library.

To run the unit tests, run `npm test` from the project root.

## Notes

- All source code is 100% my own work and written from scratch for the project. As well as taking inspiration from several popular front-end frameworks and tools, some ideas have also been adapted from my work on [Colony](https://www.wearecolony.com)'s CortexJS framework. These include the "layout tree" idea, and the declarative component event-binding pattern.

- One console log has been left in (at `./src/generic/StateManager.js#L94`) to indicate which actions are being applied to the application state and when.

- The entire application including all generic components is **55KB** minified (**9KB** GZipped).

- At present, the application has been built for and tested on the latest version of Chrome only (desktop and mobile). Wider browser support could be easily enabled via the addition of the necessary polyfills (e.g. fetch) and CSS autoprefixing.

- The original intention was for the "movie" view to be accessible by slug (e.g. `/:movieSlug/`) for nicer human readable URLs. However, it seems that the TMDB `/movies` API can only be queried by ID, hence the `/:id/` URL structure.

- Both autocomplete (with keyboard control), and full paginated search results pages are implemented. Submit the search form to navigate to a results page.

---

&copy; Patrick Kunka 2017
