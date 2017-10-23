import { connect } from 'react-redux';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { clearProductList } from '../actions/productListActions';
import { setAnalyticsProductClick } from '../actions/analyticsActions';
import { clearRealTimeStock } from '../actions/realTimeStockAction';
import { getProduct, getSimilarProducts, hasNearbyStores,
  getRealTimeStock, getStoreCode } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { productCode } } = ownProps;
  return {
    productInfo: getProduct(state, { productCode }),
    similarProducts: getSimilarProducts()(state, { productCode }),
    hasNearbyStores: hasNearbyStores(productCode)(state),
    storeStock: getRealTimeStock(state),
    storeCode: getStoreCode(state)
  };
};

const mapDispatchToProps = {
  requestFetchProduct,
  clearProductList,
  setAnalyticsProductClick,
  clearRealTimeStock
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
