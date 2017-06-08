import { connect } from 'react-redux';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { clearProductList } from '../actions/productListActions';
import { getProduct, getSimilarProducts, getAllStoreStock } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { productCode } } = ownProps;
  return {
    productInfo: getProduct(state, productCode),
    similarProducts: getSimilarProducts()(state, productCode),
    allStoreStock: getAllStoreStock(state, productCode)
  };
};

const mapDispatchToProps = {
  requestFetchProduct,
  clearProductList
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
