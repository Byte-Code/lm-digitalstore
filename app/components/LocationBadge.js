import React, { PropTypes } from 'react';
import glamorous from 'glamorous';

import IconSelector from './Icons';
import DateBadge from './DateBadge';

const Wrapper = glamorous.div({
  display: 'flex',
  width: '100%',
  padding: '0 40px 70px',
  '&>div': {
    width: '50%'
  }
});

const LeftColumn = glamorous.div({
  display: 'flex',
  alignItems: 'flex-end'
});

const InfoWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '48px',
  justifyContent: 'flex-end'
});

const Location = glamorous.p({
  fontSize: '32px',
  fontFamily: 'LeroyMerlinSans',
  color: '#fff'
});

const Temp = glamorous.div({
  textAlign: 'right',
  color: '#fff',
  fontFamily: 'LeroyMerlinSans Bold',
  fontSize: '160px',
  lineHeight: '0.94'
});

const LocationBadge = ({ city, country, weather, temp }) => (
  <Wrapper>
    <LeftColumn>
      <IconSelector weather={weather} />
      <InfoWrapper>
        <Location>{city} ({country})</Location>
        <DateBadge />
      </InfoWrapper>
    </LeftColumn>
    <Temp>{temp} &#176;</Temp>
  </Wrapper>
);

LocationBadge.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default LocationBadge;
