import React, { PropTypes } from 'react';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

const CloseButton = ({ handleClick, color, top, right, backgroundColor }) => (
  <BlockIcon
    style={{
      height: 50,
      width: 50,
      cursor: 'pointer',
      position: 'absolute',
      top,
      right,
      fill: color,
      backgroundColor
    }}
    color="#fff"
    onTouchTap={handleClick}
  />
);

CloseButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  top: PropTypes.number,
  right: PropTypes.number,
  backgroundColor: PropTypes.string
};

CloseButton.defaultProps = {
  top: 10,
  right: 10,
  backgroundColor: 'transparent'
};

export default CloseButton;
