import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts } from '../actions/productListActions';
import * as filtersActions from '../actions/filtersActions';
import {
  getCategory,
  getProductsToShow,
  getFilteredIDs,
  getFilterMap
} from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  const filterMap = getFilterMap(state);
  const productsToFetch = getFilteredIDs(state, filterMap);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, productsToFetch),
    filterMap
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  requestFetchProducts,
  ...filtersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
