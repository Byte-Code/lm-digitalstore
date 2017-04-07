import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { setSellingAids, setFilters, requestFetchProducts } from '../actions/catalogueActions';
import { getCategory, getProductsToShow, getIdsToFetch, getProductsByAids } from '../reducers/selectors';
import { buildAid, buildFilters } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const activeAid = buildAid(query);
  const activeFilters = buildFilters(query);
  const productsToFetch = getIdsToFetch(state, categoryCode, activeFilters);

  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, categoryCode, productsToFetch),
    productsByAids: getProductsByAids(state, categoryCode),
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
