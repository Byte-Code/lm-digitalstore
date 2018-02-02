import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import round from 'lodash/round';

import AvailabilityMap from '../components/AvailabilityMap';
import {
  getStore,
  getNearByWithStock,
  getSelectedNearbyStoreInfo,
  getNearbyStores,
  getMainStock
} from '../reducers/selectors';
import { requestFetchNearbyStores } from '../actions/storeActions';
import { trackStoreAvailabilityEvent } from '../actions/analyticsActions';

const mapStateToProps = (state, ownProps) => ({
  allNearbyStores: getNearbyStores(state, ownProps),
  nearbyStoresWithProductInStock: getNearByWithStock(ownProps)(state, ownProps),
  selectedStoreInfo: getSelectedNearbyStoreInfo(ownProps.selectedStore)(state, ownProps),
  homeStore: getStore(state),
  stocks: getMainStock(state)
});

const MapDispatchToProps = {
  requestFetchNearbyStores,
  trackStoreAvailabilityEvent
};

const mapKmZoom = {
  2: 13,
  12: 12,
  22: 11,
  32: 11,
  42: 10,
  50: 9
};

const enhance = compose(
  withState('radius', 'setRadius', 22),
  withState('zoom', 'setZoom', 11),
  withState('selectedStore', 'setSelectedStore', ''),
  withState('infoWindowOpen', 'setInfoWindow', false),
  withHandlers({
    selectStore: ({ setInfoWindow, setSelectedStore }) => value => {
      setSelectedStore(value, () => setInfoWindow(true));
    },
    closeInfoWindow: ({ setInfoWindow }) => () => setInfoWindow(false),
    handleChange: ({ setZoom }) => (e) => {
      setZoom(e.zoom);
    },
    handleSlide: ({ setRadius, setInfoWindow, setZoom }) => (e, v) => {
      const value = round(v);
      setZoom(mapKmZoom[value]);
      setInfoWindow(false, () => setRadius(v));
    }
  }),
  connect(mapStateToProps, MapDispatchToProps)
);

export default enhance(AvailabilityMap);
