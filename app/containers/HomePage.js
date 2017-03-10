import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Home from '../components/Home/Home';
import { fetchWorld } from '../actions/worldActions';

class HomePage extends Component {
  static propTypes = {
    fetchWorld: PropTypes.func.isRequired
  }

  componentDidMount() {
    const world = this.props.fetchWorld();
  }

  render() {
    return (
      <Home />
    );
  }
}

export default connect(null, { fetchWorld })(HomePage);
