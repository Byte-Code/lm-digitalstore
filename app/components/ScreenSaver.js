import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import LogoLM from '../assets/logo.png';

const Wrapper = styled.div`
  height: 1920px;
  width: 1080px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 450px 150px;
  &>img {
    width: 680px;
  }
`;

const HeaderWrapper = styled.div`
  text-align: center;
  &>h1 {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Header = styled.h1`
  font-size: ${props => props.fSize}
  color: ${props => props.color}
`;

export default class ScreenSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releaseDate: moment('15-4-2017', ['DD-MM-YYYY']),
    };
  }

  componentWillMount() {
    this.updateTime();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentTime !== this.state.currentTime;
  }

  updateTime() {
    return setInterval(() => {
      const currentTime = moment();
      this.setState({ currentTime });
    }, 300000);
  }

  render() {
    const { releaseDate, currentTime } = this.state;
    const days = Math.floor(moment.duration(releaseDate.diff(currentTime)).asDays());

    return (
      <Wrapper>
        <img src={LogoLM} alt="logo" />
        <HeaderWrapper>
          <Header color="#333333" fSize="120px">Digital Store</Header>
          <Header color="#67cb33" fSize="80px">in arrivo</Header>
          <Header color="#333333" fSize="100px">
            -{days}
          </Header>
        </HeaderWrapper>
      </Wrapper>
    );
  }
}
