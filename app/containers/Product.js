import { connect } from 'react-redux';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { getProduct, getStoreCode } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  productInfo: getProduct(state, ownProps.params.productCode),
  storeCode: getStoreCode(state)
});

const mapDispatchToProps = {
  requestFetchProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
