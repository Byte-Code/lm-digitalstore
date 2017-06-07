import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts, clearProductList } from '../actions/productListActions';
import * as filtersActions from '../actions/filtersActions';
import { getCatalogueProducts, getFilterMap, getCategory, getDialogStatus } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getCatalogueProducts()(state, categoryCode),
    filterMap: getFilterMap(state),
    isDialogOpen: getDialogStatus(state)
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  requestFetchProducts,
  clearProductList,
  ...filtersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
