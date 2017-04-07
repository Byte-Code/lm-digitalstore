import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { setSellingAids, setFilters, requestFetchProducts } from '../actions/catalogueActions';
import { getCategory, getProductsToShow, getIdsToFetch, getFilters, getSellingAids } from '../reducers/selectors';
import { buildAid, buildFilters, filterProductsByAid, filterProducts } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const activeAid = buildAid(query);
  const activeFilters = buildFilters(query);
  const sellingAids = getSellingAids(state, categoryCode);
  const filters = getFilters(state, categoryCode);
  const idsByAids = filterProductsByAid(sellingAids, activeAid);
  const idsByFilters = filterProducts(filters, activeFilters);
  const productsToFetch = getIdsToFetch(state, categoryCode, idsByFilters, idsByAids);

  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, categoryCode, productsToFetch),
    activeAid,
    activeFilters
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  setSellingAids,
  setFilters,
  requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
