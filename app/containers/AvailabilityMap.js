import { connect } from 'react-redux';

import AvailabilityMap from '../components/AvailabilityMap';
import { getNearbyStores, getStore } from '../reducers/selectors';
import { requestFetchNearbyStores } from '../actions/storeActions';

const mapStateToProps = (state, ownProps) => {
  const { allStoreStock } = ownProps;
  const nearbyStores = getNearbyStores(state);
  const nearbyStoreStock = nearbyStores.map(s => {
    const currentStore = allStoreStock.find(ns => ns.get('storeCode') === s.get('code'));
    return s
      .set('storeStock', currentStore.get('storeStock'))
      .set('stockStatus', currentStore.get('stockStatus'));
  });
  const currentStore = getStore(state);
  return { nearbyStoreStock, currentStore };
};

const MapDispatchToProps = {
  requestFetchNearbyStores
};

export default connect(mapStateToProps, MapDispatchToProps)(AvailabilityMap);
