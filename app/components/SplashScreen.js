import React, { Component, PropTypes } from 'react';
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

const TopDiv = glamorous.div({
  width: '100%'
});

const BottomDiv = glamorous.div({
  width: '100%',
  alignSelf: 'flex-end',
  display: 'flex',
  flexDirection: 'column'
});

const Header = glamorous.h1({
  padding: '101px 295px 60px 40px',
  lineHeight: '1.07',
  fontFamily: 'LeroyMerlinSans Bold',
  color: '#fff',
  fontSize: '120px'
});

const Banner = glamorous.div({
  background: '#67cb33',
  width: '700px',
  height: '85px',
  color: '#fff',
  fontFamily: 'LeroyMerlinSans Light-Italic',
  fontSize: '48px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '40px'
});

export default class Page extends Component {
  static propTypes = {
    forecast: ImmutablePropTypes.map.isRequired,
    requestFetchWeather: PropTypes.func.isRequired
  };

  static defaultProps = {
    forecast: Map()
  };

  componentDidMount() {
    this.props.requestFetchWeather();
  }

  render() {
    const { forecast } = this.props;

    if (forecast.isEmpty()) {
      return null;
    }

    return (
      <Link to="/world">
        <Wrapper>
          <TopDiv>
            <Header>Accendi la tua voglia di estate</Header>
            <Banner>Entra nel mondo giardino</Banner>
          </TopDiv>
          <BottomDiv>
            <ScreenSaver />
          </BottomDiv>
        </Wrapper>
      </Link>
    );
  }
}
