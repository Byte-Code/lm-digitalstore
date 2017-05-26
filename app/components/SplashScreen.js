import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map } from 'immutable';
import styled from 'styled-components';
import ScreenSaver from './ScreenSaver';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
`;

const TopDiv = styled.div`
  width: 100%;
`;

const BottomDiv = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
`;

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
