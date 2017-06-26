import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWeather } from '../actions/weatherActions';
import { getWeather } from '../reducers/selectors';
import { startAnalyticsSession } from '../actions/analyticsActions';

const mapStateToProps = (state) => ({
  forecast: getWeather(state)
});

const mapDispatchToProps = {
  requestFetchWeather,
  startAnalyticsSession
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
