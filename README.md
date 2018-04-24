# Sergey Stadnik's coding test for Hooroo

## implementation summary

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Additional libraries and tools:
  - [axios](https://github.com/axios/) for XHR requests
  - [Bootstrap 4](https://getbootstrap.com/) for UI styling
  - [ESLint](https://eslint.org/) for linting Javascript code
  - [flow](https://flow.org/) for type checking
  - [enzyme](https://github.com/airbnb/enzyme) and [jest](https://facebook.github.io/jest/) for unit tests
  - [json-server](https://github.com/typicode/json-server) - A simple REST server for API testing
  - [prettier](https://prettier.io/) for code formatting

## Notes
  - Beause we don't need any customisation of Bootstrap themes, the Bootstrap CSS is inluded from its CDN.
  - _create-react-app_ bootstraps a [progressive web application](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) with [offline-first policy](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#offline-first-considerations) whih may cause problems with invalidation of data caches. To avoid that, [service workers are disabled](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#opting-out-of-caching) in `src/index.js`.
  - App.js requires more unit testing. We can't use [jest snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html) here because the rendering of this component depends on an asynchronous action (Axios HXR request). We will need to test the functionality piece by piece. We may use the [Enzyme](https://github.com/airbnb/enzyme) library to verify that the `ActorsList` component is being rendered inside `App`, and use [Axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter) to mock the reply from the REST API to test that the data flows through to `ActorsList`.

## Results

![screenshot](screenshot.png)

## Available run scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn flow`

Starts _flow_ server

### `yarn flow stop`

Stops _flow_ server

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn server`

Launches the API REST server on port 3001.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

