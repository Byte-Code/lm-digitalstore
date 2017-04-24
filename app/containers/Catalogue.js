import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { setSellingAids, setFilters, requestFetchProducts } from '../actions/productListActions';
import { getCategory, getProductsToShow, getFilters, getSellingAids, getOrderedProducts } from '../reducers/selectors';
import { buildAid, buildFilters, buildAvailability, filterProductsByAid, filterProducts, filterProductsByAvailability, filterCatalogue } from '../utils/filterUtils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const activeAid = buildAid(query);
  const activeFilters = buildFilters(query);
  const activeAvailability = buildAvailability(query);
  const sellingAids = getSellingAids(state, categoryCode);
  const filterGroups = getFilters(state, categoryCode);
  const orderedProducts = getOrderedProducts(state, categoryCode);
  const idsByAids = filterProductsByAid(sellingAids, activeAid);
  const idsByFilters = filterProducts(filterGroups, activeFilters);
  const idsByAvailability = filterProductsByAvailability(orderedProducts, activeAvailability);
  const productsToFetch = filterCatalogue(idsByAids, idsByFilters, idsByAvailability);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, productsToFetch),
    activeAid,
    activeFilters,
    activeAvailability,
    idsByAids,
    orderedProducts
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  setSellingAids,
  setFilters,
  requestFetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
