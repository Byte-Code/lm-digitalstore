import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { filterCatalogueByAids } from '../actions/catalogueActions';
import { getCategory, getProductsToShow, getSellingAid } from '../reducers/selectors';
import { buildAid } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const categoryCode = ownProps.params.categoryCode;
  const activeAid = buildAid(ownProps.router.location.query);
  const idListAid = getSellingAid(state, categoryCode, activeAid);
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getProductsToShow(state, categoryCode, idListAid),
    activeAid,
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  filterCatalogueByAids
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
