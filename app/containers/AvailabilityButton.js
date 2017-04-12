import { connect } from 'react-redux';

import AvailabilityButton from '../components/AvailabilityButton';
import { getNearbyStores } from '../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { nearbyStoreStock } = ownProps;
  const nearbyStores = getNearbyStores(state);
  const nearbyStocks = nearbyStores.map(s => {
    const hasProduct = nearbyStoreStock.find(ns => ns.get('code') === s.get('code'));
    if (hasProduct) {
      return s.set('storeStock', (hasProduct.get('storeStock') - 2));
    } return s.set('storeStock', 0);
  });
  return { nearbyStocks };
};

export default connect(mapStateToProps, {})(AvailabilityButton);
