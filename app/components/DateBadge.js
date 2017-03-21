import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

moment.locale('it');

const Time = styled.div`
  font-size: 48px;
  color: #fff;
  font-family: LeroyMerlinSans Bold;
  text-transform: uppercase;
`;

export default class DateBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: ''
    };
  }

  componentDidMount() {
    this.updateTime();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentTime !== this.state.currentTime;
  }

  updateTime() {
    setInterval(() => {
      const currentTime = moment().format('ddd HH:mm');
      this.setState({ currentTime });
    }, 1000);
  }

  render() {
    const { currentTime } = this.state;
    return (
      <Time>
        {currentTime}
      </Time>
    );
  }
}
