import { connect } from 'react-redux';

import Home from '../components/Home';
import fetchWorld from '../actions/worldActions';
import getWorld from '../reducers/selectors';

const mapStateToProps = (state) => ({
  world: getWorld(state)
});

const mapDispatchToProps = {
  fetchWorld
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
