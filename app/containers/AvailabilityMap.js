import { connect } from 'react-redux';

import AvailabilityMap from '../components/AvailabilityMap';
import { getNearbyStores, getStore } from '../reducers/selectors';
import { requestFetchNearbyStores } from '../actions/storeActions';

const mapStateToProps = (state, ownProps) => {
  const { allStoreStock } = ownProps;
  const nearbyStores = getNearbyStores(state);
  const nearbyStoreStock = nearbyStores.map(s => {
    const hasProduct = allStoreStock.find(ns => ns.get('storeCode') === s.get('code'));
    if (hasProduct) {
      return s.set('storeStock', hasProduct.get('storeStock'));
    } return s.set('storeStock', 0);
  });
  const currentStore = getStore(state);
  return { nearbyStoreStock, currentStore };
};

const MapDispatchToProps = {
  requestFetchNearbyStores
};

export default connect(mapStateToProps, MapDispatchToProps)(AvailabilityMap);
