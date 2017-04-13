import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import FamilySideBar from '../components/FamilySideBar';
import { requestFetchWorld } from '../actions/worldActions';
import { getWorld } from '../reducers/selectors';

const mapStateToProps = (state) => ({
  world: getWorld(state)
});

const mapDispatchToProps = {
  requestFetchWorld,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilySideBar);
