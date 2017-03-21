import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWeather } from '../actions/weatherActions';
import { getWeather } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  forecast: getWeather(state)
});

const mapDispatchToProps = {
  requestFetchWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
