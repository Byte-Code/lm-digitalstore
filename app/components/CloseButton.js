import React, { PropTypes } from 'react';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

const CloseButton = ({ handleClick, color }) => (
  <BlockIcon
    style={{
      height: 50,
      width: 50,
      cursor: 'pointer',
      position: 'absolute',
      top: 10,
      right: 10,
      fill: color
    }}
    color="#fff"
    onTouchTap={handleClick}
  />
);

CloseButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

export default CloseButton;
