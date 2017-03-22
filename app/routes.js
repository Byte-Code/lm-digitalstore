import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import HomePage from './pages/HomePage';
import SplashScreenPage from './pages/SplashScreenPage';
import CataloguePage from './pages/CataloguePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SplashScreenPage} />
    <Route path="/world" component={HomePage} />
    <Route path="/catalogue/:categoryCode" component={CataloguePage} />
  </Route>
);
