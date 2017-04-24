import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { setSellingAids, setFilters, requestFetchProducts } from '../actions/productListActions';
import { getCategory, getProductsToShow, getFilters, getSellingAids } from '../reducers/selectors';
import { buildAid, buildFilters, filterProductsByAid, filterProducts } from '../utils/filterUtils';

export function getIdsToFetch(idsByFilters, idsByAids) {
  if (idsByAids.isEmpty()) {
    return idsByFilters;
  }
  return idsByAids.intersect(idsByFilters);
}


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
  const productsToFetch = getIdsToFetch(idsByFilters, idsByAids);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, productsToFetch),
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
