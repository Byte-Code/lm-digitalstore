import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWorld } from '../actions/worldActions';
import { getWorld } from '../reducers/selectors';
import { startAnalyticsSession } from '../actions/analyticsActions';

const mapStateToProps = (state) => ({
  world: getWorld(state)
});

const mapDispatchToProps = {
  startAnalyticsSession,
  requestFetchWorld
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
