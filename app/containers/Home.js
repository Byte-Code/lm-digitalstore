import { connect } from 'react-redux';

import Home from '../components/Home';
import { requestFetchWorld } from '../actions/worldActions';
import getWorld from '../reducers/selectors';

const mapStateToProps = (state) => ({
  world: getWorld(state)
});

const mapDispatchToProps = {
  requestFetchWorld
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
