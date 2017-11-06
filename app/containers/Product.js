import { connect } from 'react-redux';

import Product from '../components/Product';
import { requestFetchProduct } from '../actions/productActions';
import { clearProductList } from '../actions/productListActions';
import { setAnalyticsProductClick, trackPurchaseEvent, analyticsOpenOverlay } from '../actions/analyticsActions';
import { clearRealTimeStock } from '../actions/realTimeStockAction';
import { getProduct, getSimilarProducts, hasNearbyStores, getCurrentProductStock,
  getStoreCode, getSimilarProductStock } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: { productCode } } = ownProps;
  return {
    productInfo: getProduct(state, { productCode }),
    similarProducts: getSimilarProducts()(state, { productCode }),
    hasNearbyStores: hasNearbyStores(productCode)(state),
    mainStoreStock: getCurrentProductStock(productCode)(state),
    storeCode: getStoreCode(state),
    similarProductStocks: getSimilarProductStock(state)
  };
};

const mapDispatchToProps = {
  requestFetchProduct,
  clearProductList,
  setAnalyticsProductClick,
  clearRealTimeStock,
  trackPurchaseEvent,
  analyticsOpenOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
