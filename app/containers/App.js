import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IdleDialog from '../containers/IdleDialog';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <IdleDialog />
        {this.props.children}
      </div>
    );
  }
}
