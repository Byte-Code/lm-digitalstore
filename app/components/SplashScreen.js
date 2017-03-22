import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map } from 'immutable';
import styled from 'styled-components';

import LocationBadge from './LocationBadge';
import ForecastBadge from './ForecastBadge';

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

const TodayInfo = styled.div`
  display: flex;
  width: 100%;
  padding: 0 40px 70px;
  &>div {
    width: 50%;
  }
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

const Temp = styled.div`
  text-align: right;
  color: #fff;
  font-family: LeroyMerlinSans Bold;
  font-size: 160px;
  line-height: 0.94;
`;

const ForecastList = styled.div`
  display: flex;
  padding: 50px 40px;
  background: #333333;
  justify-content: space-between;
`;

export default class Page extends Component {
  static propTypes = {
    forecast: ImmutablePropTypes.map.isRequired,
    requestFetchWeather: PropTypes.func.isRequired
  }

  static defaultProps = {
    forecast: Map()
  }

  componentDidMount() {
    this.props.requestFetchWeather();
    this.props.requestFetchCategory('CAT655');
  }

  render() {
    const { forecast } = this.props;

    if (forecast.isEmpty()) {
      return null;
    }

    const city = forecast.getIn(['city', 'name']);
    const country = forecast.getIn(['city', 'country']);
    const weather = forecast.getIn(['list', 0, 'weather', 0, 'main']);
    const temp = Math.floor(forecast.getIn(['list', 0, 'temp', 'day']));
    const dailyForecast1 = forecast.getIn(['list', 1]);
    const dailyForecast2 = forecast.getIn(['list', 2]);
    const dailyForecast3 = forecast.getIn(['list', 3]);
    const dailyForecast4 = forecast.getIn(['list', 4]);

    return (
      <Link to="/world">
        <Wrapper>
          <TopDiv>
            <Header>Accendi la tua voglia di estate</Header>
            <Banner>Entra nel mondo giardino</Banner>
          </TopDiv>
          <BottomDiv>
            <TodayInfo>
              <LocationBadge
                city={city}
                country={country}
                weather={weather}
                temp={temp}
              />
              <Temp>{temp} &#176;</Temp>
            </TodayInfo>
            <ForecastList>
              <ForecastBadge dailyForecast={dailyForecast1} />
              <ForecastBadge dailyForecast={dailyForecast2} />
              <ForecastBadge dailyForecast={dailyForecast3} />
              <ForecastBadge dailyForecast={dailyForecast4} />
            </ForecastList>
          </BottomDiv>
        </Wrapper>
      </Link>
    );
  }
}
