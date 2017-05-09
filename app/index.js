import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import configureStore, { sagaMiddleware } from './store/configureStore';

import routes from './routes';
import rootSaga from './sagas/sagas';
import initializeIdleTimer from './utils/initialize-idle-timer';
import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  }
});
injectTapEventPlugin();
sagaMiddleware.run(rootSaga);
initializeIdleTimer(store);

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: '#67cb33',
    rippleColor: '#67cb33',
    handleSize: 20
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={history}
        routes={routes}
      />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
