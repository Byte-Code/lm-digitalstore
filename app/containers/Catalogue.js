import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { getCategory, getProductsToShow } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  categoryInfo: getCategory(state, ownProps.params.categoryCode),
  products: getProductsToShow(state)
});

const mapDispatchToProps = {
  requestFetchCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
