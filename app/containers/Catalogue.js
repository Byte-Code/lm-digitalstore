import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { getCategory, getProductsToShow } from '../reducers/selectors';
import { buildFilters } from '../utils/utils';

const mapStateToProps = (state, ownProps) => ({
  categoryInfo: getCategory(state, ownProps.params.categoryCode),
  products: getProductsToShow(state),
  activeFilters: buildFilters(ownProps.router.location.query)
});

const mapDispatchToProps = {
  requestFetchCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
