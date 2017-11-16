import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <div id="pippo" />
        {this.props.children}
      </div>
    );
  }
}
