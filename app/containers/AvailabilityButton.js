import { connect } from 'react-redux';

import AvailabilityButton from '../components/AvailabilityButton';
import { getNearbyStores } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  nearbyStores: getNearbyStores(state)
});

export default connect(mapStateToProps, {})(AvailabilityButton);
