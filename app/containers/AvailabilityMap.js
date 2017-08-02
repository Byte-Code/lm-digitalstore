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

const enhance = compose(
  withState('radius', 'setRadius', 25),
  withState('zoom', 'setZoom', 11),
  withState('initialZoom', 'setInitialZoom', 11),
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
    handleSlide: ({ setRadius, setInfoWindow, setInitialZoom }) => (e, v) => {
      const value = round(v);
      setInitialZoom(value);
      setInfoWindow(false, () => setRadius(v));
    }
  }),
  connect(mapStateToProps, MapDispatchToProps)
);

export default enhance(AvailabilityMap);
