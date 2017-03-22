import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWeather } from '../actions/weatherActions';
import { requestFetchCategory } from '../actions/categoryActions';
import { getWeather } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  forecast: getWeather(state)
});

const mapDispatchToProps = {
  requestFetchWeather,
  requestFetchCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
