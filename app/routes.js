import React from 'react';
import {Route, IndexRoute} from 'react-router';

import verifyStoreId from './containers/verifyStoreId';
import App from './containers/App';
import HomePage from './pages/HomePage';
import SplashScreenPage from './pages/SplashScreenPage';
import CataloguePage from './pages/CataloguePage';
import ProductPage from './pages/ProductPage';
import InitializationPage from './pages/InitializationPage';
import SelectStorePage from './pages/SelectStorePage';

export default (
  <Route>
    <Route path="/">
      <IndexRoute component={verifyStoreId(App)}>
        <IndexRoute component={SplashScreenPage}/>
        <Route path="/world" component={HomePage}/>
        <Route path="/catalogue/:categoryCode" component={CataloguePage}/>
        <Route path="/product/:productCode" component={ProductPage}/>
      </IndexRoute>
    </Route>
  
    <Route path="/initialization" component={InitializationPage}/>
    <Route path="/store-selection" component={SelectStorePage}/>
    
  </Route>
);
