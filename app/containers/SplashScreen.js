import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWeather } from '../actions/weatherActions';
import { requestFetchWorld } from '../actions/worldActions'
import { getWeather , getWorld } from '../reducers/selectors';
import { startAnalyticsSession } from '../actions/analyticsActions';

const mapStateToProps = (state) => ({
  forecast: getWeather(state),
  world : getWorld(state)
});

const mapDispatchToProps = {
  requestFetchWeather,
  startAnalyticsSession,
  requestFetchWorld
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
