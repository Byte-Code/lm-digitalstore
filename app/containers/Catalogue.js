import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts } from '../actions/productListActions';
import { getCategory, getProductsToShow, getFilteredIDs } from '../reducers/selectors';
import { buildFilterMap } from '../utils/filterUtils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const filterMap = buildFilterMap(query, categoryCode);
  const productsToFetch = getFilteredIDs(state, filterMap);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, productsToFetch),
    filterMap
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
