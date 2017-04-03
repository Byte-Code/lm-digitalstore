import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { filterCatalogueByAids } from '../actions/catalogueActions';
import { getCategory, getProductsToShow, getSellingAid } from '../reducers/selectors';
import { buildAid } from '../utils/utils';

const mapStateToProps = (state, ownProps) => {
  const activeAid = buildAid(ownProps.router.location.query);
  const sellingAid = getSellingAid(state, ownProps.params.categoryCode, activeAid);
  console.log(sellingAid);
  return {
    categoryInfo: getCategory(state, ownProps.params.categoryCode),
    products: getProductsToShow(state, sellingAid),
    activeAid,
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  filterCatalogueByAids
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
