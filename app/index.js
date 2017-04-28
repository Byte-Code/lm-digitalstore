import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore, { sagaMiddleware } from './store/configureStore';
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

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={history}
        routes={routes}
      />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

