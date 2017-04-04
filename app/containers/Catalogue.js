import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { filterCatalogueByAids } from '../actions/catalogueActions';
import { getCategory, getProductsToShow, getSellingAid } from '../reducers/selectors';
import { buildAid, buildFilters } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const {
    params: { categoryCode },
    router: { location: { query } }
  } = ownProps;
  const activeAid = buildAid(query);
  const idListAid = getSellingAid(state, categoryCode, activeAid);
  const activeFilters = buildFilters(query);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, categoryCode, idListAid),
    activeAid,
    activeFilters
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  filterCatalogueByAids
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
