import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IdleDialog from '../containers/IdleDialog';
import initializeIdleTimer from '../utils/initialize-idle-timer';

class WithWarningDialog extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.timer = initializeIdleTimer(props.dispatch);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  render() {
    return (
      <div>
        <IdleDialog />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(WithWarningDialog);
