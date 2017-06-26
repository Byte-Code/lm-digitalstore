import React from 'react';
import { Route, IndexRoute } from 'react-router';

import verifystoreCode from './containers/verifyStoreCode';
import App from './containers/App';
import WithWarningDialog from './containers/WithWarningDialog';
import HomePage from './Pages/HomePage';
import SplashScreenPage from './Pages/SplashScreenPage';
import CataloguePage from './Pages/CataloguePage';
import ProductPage from './Pages/ProductPage';
import InitializationPage from './Pages/InitializationPage';
import SelectStorePage from './Pages/SelectStorePage';

export default (
  <Route>
    <Route path="/" component={verifystoreCode(App)}>
      <IndexRoute component={SplashScreenPage} />
      <Route component={WithWarningDialog}>
        <Route path="/world" component={HomePage} />
        <Route path="/catalogue/:categoryCode" component={CataloguePage} />
        <Route path="/product/:productCode" component={ProductPage} />
      </Route>
    </Route>

    <Route path="/initialization" component={InitializationPage} />
    <Route path="/store-selection" component={SelectStorePage} />

  </Route>
);
