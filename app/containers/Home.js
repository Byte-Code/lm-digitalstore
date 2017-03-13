import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchWorld } from '../actions/worldActions';

const mapDispatchToProps = {
  fetchWorld
};

export default connect(null, mapDispatchToProps)(Home);
