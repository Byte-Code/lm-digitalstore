import { connect } from 'react-redux';
import { List } from 'immutable';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { getProduct, getStoreCode, getProductsToShow } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { productCode } } = ownProps;
  const productInfo = getProduct(state, productCode);
  let productIDList;
  if (productInfo) {
    const sim = productInfo.get('similarProducts') || List();
    productIDList = sim.reduce((acc, value) => acc.push(value.get('products')), List()).flatten();
  } else productIDList = List();
  return {
    productInfo,
    storeCode: getStoreCode(state),
    similarProducts: getProductsToShow()(state, productIDList)
  };
};

const mapDispatchToProps = {
  requestFetchProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
