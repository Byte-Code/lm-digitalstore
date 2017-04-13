import { connect } from 'react-redux';

import AvailabilityButton from '../components/AvailabilityButton';
import { getNearbyStores } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { allStoreStock } = ownProps;
  const nearbyStores = getNearbyStores(state);
  const nearbyStoreStock = nearbyStores.map(s => {
    const hasProduct = allStoreStock.find(ns => ns.get('storeCode') === s.get('code'));
    if (hasProduct) {
      return s.set('storeStock', hasProduct.get('storeStock'));
    } return s.set('storeStock', 0);
  });
  return { nearbyStoreStock };
};

export default connect(mapStateToProps, {})(AvailabilityButton);
