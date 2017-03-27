import React, { PropTypes } from 'react';
import styled from 'styled-components';

import IconSelector from './Icons';
import DateBadge from './DateBadge';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 40px 70px;
  &>div {
    width: 50%;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: flex-end;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 48px;
  justify-content: flex-end;
`;

const Location = styled.p`
  font-size: 32px;
  font-family: LeroyMerlinSans;
  color: #fff;
`;

const Temp = styled.div`
  text-align: right;
  color: #fff;
  font-family: LeroyMerlinSans Bold;
  font-size: 160px;
  line-height: 0.94;
`;

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
