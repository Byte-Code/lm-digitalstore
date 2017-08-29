import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import round from 'lodash/round';

import AvailabilityMap from '../components/AvailabilityMap';
import {
  getNearbyStoresWithStock,
  getStore,
  getNearbyStoresWithProductInStock,
  getSelectedNearbyStoreInfo
} from '../reducers/selectors';
import { requestFetchNearbyStores } from '../actions/storeActions';
import { trackStoreAvailabilityEvent } from '../actions/analyticsActions';

const mapStateToProps = (state, ownProps) => ({
  allNearbyStores: getNearbyStoresWithStock(state, ownProps),
  nearbyStoresWithProductInStock: getNearbyStoresWithProductInStock(state, ownProps),
  selectedStoreInfo: getSelectedNearbyStoreInfo(ownProps.selectedStore)(state, ownProps),
  homeStore: getStore(state)
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
  withState('radius', 'setRadius', 25),
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
