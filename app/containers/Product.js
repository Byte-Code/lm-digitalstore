import { connect } from 'react-redux';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { clearProductList } from '../actions/productListActions';
import { setAnalyticsProductClick } from '../actions/analyticsActions';
import { getProduct, getSimilarProducts, hasNearbyStores } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { productCode } } = ownProps;
  return {
    productInfo: getProduct(state, { productCode }),
    similarProducts: getSimilarProducts()(state, { productCode }),
    hasNearbyStores: hasNearbyStores(state)
  };
};

const mapDispatchToProps = {
  requestFetchProduct,
  clearProductList,
  setAnalyticsProductClick
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
