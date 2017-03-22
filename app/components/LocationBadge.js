import React, { PropTypes } from 'react';
import styled from 'styled-components';

import IconSelector from './Icons';
import DateBadge from './DateBadge';

const Wrapper = styled.div`
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

const LocationBadge = ({ city, country, weather }) => (
  <Wrapper>
    <IconSelector weather={weather} />
    <InfoWrapper>
      <Location>{city} ({country})</Location>
      <DateBadge />
    </InfoWrapper>
  </Wrapper>
);

LocationBadge.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired
};

export default LocationBadge;
