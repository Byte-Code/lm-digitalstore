import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { setSellingAids, setFilters } from '../actions/catalogueActions';
import { getCategory, getProductsToShow } from '../reducers/selectors';
import { buildAid, buildFilters } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const activeAid = buildAid(query);
  const activeFilters = buildFilters(query);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, categoryCode, activeFilters),
    activeAid,
    activeFilters
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  setSellingAids,
  setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
