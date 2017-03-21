import React, { PropTypes } from 'react';
import styled from 'styled-components';

import IconSelector from './Icons';

const Wrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  height: 100px;
  width: 100px;
  background: red;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationBadge = ({ location, weather }) => (
  <Wrapper>
    <IconWrapper>
      <IconSelector weather={weather} />
    </IconWrapper>
    <LocationWrapper>{location}</LocationWrapper>
  </Wrapper>
);

LocationBadge.propTypes = {
  location: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired
};

export default LocationBadge;
