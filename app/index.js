import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import immutableDevtools from 'immutable-devtools';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'glamorous';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { startRouterChangeListener } from './utils/RouterChangeListener';

import configureStore, { sagaMiddleware } from './store/configureStore';
import Light from './assets/LM_Font/LeroyMerlinSansOfficeLight-Italic.ttf';
import routes from './routes';
import rootSaga from './sagas/sagas';
import './app.global.css';


if (process.env.NODE_ENV === 'development') {
  immutableDevtools(Immutable);
}

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  }
});
injectTapEventPlugin();
sagaMiddleware.run(rootSaga);

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#67cb33',
    rippleColor: '#67cb33',
    handleSize: 20
  },
  overlay: {
    backgroundColor: 'rgba(51, 51, 51, 0.8)'
  }
});

const theme = {
  '@fontFace': {
    fontFamily: 'LeroyMerlinSans Light',
    src: `url(${Light})`
  }
};

startRouterChangeListener();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
