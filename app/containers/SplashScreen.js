import { connect } from 'react-redux';

import SplashScreen from '../components/SplashScreen';
import { requestFetchWeather } from '../actions/weatherActions';
import { requestFetchCategoryDisplay } from '../actions/categoryDisplayActions';
import { getWeather } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  forecast: getWeather(state)
});

const mapDispatchToProps = {
  requestFetchWeather,
  requestFetchCategoryDisplay
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
