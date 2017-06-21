import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DateBadge extends Component {
  static propTypes = {
    initialTime: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.initialTime,
      intID: ''
    };
  }

  componentWillMount() {
    const intID = this.updateTime();
    this.setState({ intID });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentTime !== this.state.currentTime;
  }

  componentWillUnmount() {
    const { intID } = this.state;
    clearInterval(intID);
  }

  updateTime() {
    return setInterval(() => {
      const currentTime = this.state.currentTime - 1;
      this.setState({ currentTime });
    }, 1000);
  }

  render() {
    return (
      <span>
        {this.state.currentTime}
      </span>
    );
  }
}
