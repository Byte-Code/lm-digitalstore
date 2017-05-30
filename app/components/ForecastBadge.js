import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';

import IconSelector from './Icons';

const Wrapper = glamorous.div({
  width: '235px',
  height: '280px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const Day = glamorous.div({
  fontSize: '24px',
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  textTransform: 'uppercase'
});

const Temp = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  '&>p': {
    textAlign: 'center'
  }
});

const GreenText = glamorous.span({
  fontSize: '20px',
  textTransform: 'uppercase',
  color: '#67cb33',
  marginRight: '10px'
});

const WhiteText = glamorous.span({
  fontSize: '40px',
  color: '#fff'
});

const IconWrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

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
