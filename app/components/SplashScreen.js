import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import * as Icons from './Icons';

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
        <h1>Animated Weather Icons</h1>
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
