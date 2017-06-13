import { connect } from 'react-redux';

import AvailabilityMap from '../components/AvailabilityMap';
import { getNearbyStoresWithStock, getStore } from '../reducers/selectors';
import { requestFetchNearbyStores } from '../actions/storeActions';

const mapStateToProps = (state, ownProps) => ({
  nearbyStoreStock: getNearbyStoresWithStock(state, ownProps.productCode),
  currentStore: getStore(state)
});

const MapDispatchToProps = {
  requestFetchNearbyStores
};

export default connect(mapStateToProps, MapDispatchToProps)(AvailabilityMap);
