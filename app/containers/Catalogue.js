import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts } from '../actions/productListActions';
import * as filtersActions from '../actions/filtersActions';
import { getCatalogueProducts, getFilterMap, getCategory } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  const toShowSelector = getCatalogueProducts();
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: toShowSelector(state, categoryCode),
    filterMap: getFilterMap(state)
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  requestFetchProducts,
  ...filtersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
