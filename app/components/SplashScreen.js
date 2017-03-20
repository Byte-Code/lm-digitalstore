import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

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
      <div>hola hola</div>
    );
  }
}
