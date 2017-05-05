import React, { PropTypes } from 'react';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

const CloseButton = ({ handleClick, top, right, backgroundColor, fill }) => (
  <BlockIcon
    style={{
      fill,
      backgroundColor,
      top,
      right,
      width: 80,
      height: 80,
      position: 'absolute',
      cursor: 'pointer'
    }}
    color="#fff"
    onTouchTap={
      (e) => {
        if (e) {
          e.preventDefault();
        }
        handleClick();
      }
    }
  />
);

CloseButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  top: PropTypes.number,
  right: PropTypes.number,
  fill: PropTypes.string,
  backgroundColor: PropTypes.string
};

CloseButton.defaultProps = {
  top: 0,
  right: 0,
  fill: '#858585',
  backgroundColor: '#333333'
};

export default CloseButton;
