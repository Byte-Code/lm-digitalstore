import React from 'react';
import PropTypes from 'prop-types';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MyPlaceIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import glamorous from 'glamorous';

export const Wrapper = glamorous.div({
  position: 'relative',
  zIndex: 1,
  transform: 'translate(-50%, -50%)'
});

const WhiteBg = glamorous.div({
  position: 'absolute',
  height: '25px',
  width: '20px',
  zIndex: -1,
  top: '9px',
  left: '16px',
  backgroundColor: '#fff'
});

const iconStyle = { height: 55, width: 55, cursor: 'pointer' };

const Marker = ({ handleClick, isCurrentStore, isAvailable }) => {
  const Icon = isCurrentStore ? MyPlaceIcon : PlaceIcon;
  const iconColor = isAvailable ? '#67cb33' : '#000';
  return (
    <Wrapper onClick={handleClick}>
      <Icon style={iconStyle} color={iconColor} />
      <WhiteBg />
    </Wrapper>
  );
};

Marker.propTypes = {
  isCurrentStore: PropTypes.bool.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Marker;
