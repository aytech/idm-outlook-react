import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import App from './components/App';

import './styles.less';
import 'office-ui-fabric-react/dist/css/fabric.min.css';

initializeIcons();

let isOfficeInitialized = false;

const render = (Component: typeof App): void => {
  ReactDOM.render(
    (
      <AppContainer>
        <Component isOfficeInitialized={isOfficeInitialized}/>
      </AppContainer>
    ),
    document.getElementById('container')
  );
};

/* Render application after Office initializes */
Office.initialize = (): void => {
  isOfficeInitialized = true;
  render(App);
};

/* Initial render showing a progress bar */
render(App);

/* Set up for Webpack HMR plugin */
if (module.hot) {
  module.hot.accept(
    './components/App',
    (): void => {
      const NextApp = require('./components/App').default;
      render(NextApp);
    }
  );
}
