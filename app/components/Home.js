import React, { Component, PropTypes } from 'react';

export default class Home extends Component {

  static propTypes = {
    fetchWorld: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchWorld();
  }

  render() {
    return (
      <div>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Leroy_Merlin.svg" alt="logo" />
          <h1>Digital Store</h1>
        </div>
      </div>
    );
  }
}
