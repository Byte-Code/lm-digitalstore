import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import IconSelector from './Icons';

const Wrapper = styled.div`
  width: 235px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Day = styled.div`
  font-size: 24px;
  width: 100%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
`;

const Temp = styled.div`
  display: flex;
  flex-direction: column;
  &>p {
    text-align: center;
  }
`;

const GreenText = styled.span`
  font-size: 20px;
  text-transform: uppercase;
  color: #67cb33;
  margin-right: 10px;
`;

const WhiteText = styled.span`
  font-size: 40px;
  color: #fff;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForecastBadge = ({ dailyForecast }) => {
  const dt = dailyForecast.get('dt');
  const minTemp = dailyForecast.getIn(['temp', 'min']);
  const maxTemp = dailyForecast.getIn(['temp', 'max']);
  const weather = dailyForecast.getIn(['weather', 0, 'main']);

  return (
    <Wrapper>
      <Day>{dt}</Day>
      <IconWrapper>
        <IconSelector weather={weather} />
      </IconWrapper>
      <Temp>
        <p>
          <GreenText>min.</GreenText>
          <WhiteText>{minTemp} &#176;</WhiteText>
        </p>
        <p>
          <GreenText>max.</GreenText>
          <WhiteText>{maxTemp} &#176;</WhiteText>
        </p>
      </Temp>
    </Wrapper>
  );
};

ForecastBadge.propTypes = {
  dailyForecast: ImmutablePropTypes.map.isRequired
};

export default ForecastBadge;
