import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { filterCatalogueByAids } from '../actions/catalogueActions';
import { getCategory, getProductsToShow } from '../reducers/selectors';
import { buildAids } from '../utils/utils';

const mapStateToProps = (state, ownProps) => ({
  categoryInfo: getCategory(state, ownProps.params.categoryCode),
  products: getProductsToShow(state),
  activeAids: buildAids(ownProps.router.location.query)
});

const mapDispatchToProps = {
  requestFetchCategory,
  filterCatalogueByAids
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
