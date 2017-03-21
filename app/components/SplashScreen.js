import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import * as Icons from './Icons';

const Header = styled.h1`
  padding: 101px 295px 60px 40px;
  line-height: 1.07;
  font-family: LeroyMerlinSans Bold;
  color: #fff;
  font-size: 120px;
`;

const Banner = styled.div`
  background: #67cb33;
  width: 700px;
  height: 85px;
  color: #fff;
  font-family: LeroyMerlinSans Light-Italic;
  font-size: 48px;
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

export default class Page extends Component {
  static propTypes = {
    weather: ImmutablePropTypes.map.isRequired,
    requestFetchWeather: PropTypes.func.isRequired
  }

  static defaultProps = {
    weather: Map()
  }

  componentDidMount() {
    this.props.requestFetchWeather();
  }

  render() {
    return (
      <div>
        <Header>Accendi la tua voglia di Estate</Header>
        <Banner>Entra nel mondo giardino</Banner>
        <Icons.sunnyIcon />
        <Icons.sunShowerIcon />
        <Icons.cloudyIcon />
        <Icons.flurriesIcon />
        <Icons.rainyIcon />
        <Icons.thunderStormIcon />
      </div>
    );
  }
}
