import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map } from 'immutable';
import glamorous from 'glamorous';

import ScreenSaver from './ScreenSaver';

const Wrapper = glamorous.div({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexWrap: 'wrap'
});

const BottomDiv = glamorous.div({
  width: '100%',
  alignSelf: 'flex-end',
  display: 'flex',
  flexDirection: 'column'
});

export default class Page extends Component {
  static propTypes = {
    forecast: ImmutablePropTypes.map.isRequired,
    world : ImmutablePropTypes.map.isRequired,
    requestFetchWeather: PropTypes.func.isRequired,
    requestFetchWorld : PropTypes.func.isRequired
  };

  static defaultProps = {
    forecast: Map()
  };

  componentDidMount() {
    this.props.requestFetchWeather();
    this.props.requestFetchWorld();
  }

  render() {
    const { forecast , world } = this.props;

    console.log('xxxxxxxxxxxxxxxxxxxxx',world);

    if (forecast.isEmpty()) {
      return null;
    }

    return (
      <Link to="/world">
        <Wrapper>
          <BottomDiv>
            <ScreenSaver video={world.get('screenSaverVideo')}/>
          </BottomDiv>
        </Wrapper>
      </Link>
    );
  }
}
