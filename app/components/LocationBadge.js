import React, { PropTypes } from 'react';
import styled from 'styled-components';

import IconSelector from './Icons';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const IconWrapper = styled.div`
  padding: 10px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 48px;
`;

const Location = styled.p`
  font-size: 32px;
  font-family: LeroyMerlinSans;
  color: #fff;
`;

const LocationBadge = ({ city, country, weather }) => (
  <Wrapper>
    <IconWrapper>
      <IconSelector weather={weather} />
    </IconWrapper>
    <InfoWrapper>
      <Location>{city}, ({country})</Location>
    </InfoWrapper>
  </Wrapper>
);

LocationBadge.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired
};

export default LocationBadge;
