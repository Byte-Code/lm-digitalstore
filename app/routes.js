import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import HomePage from './Pages/HomePage';
import SplashScreenPage from './Pages/SplashScreenPage';

export default (
  <Route path="/" component={App}>
    <Route component={HomePage} />
    <IndexRoute component={SplashScreenPage} />
  </Route>
);
