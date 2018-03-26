import React from 'react';
import FlowerIcon from 'material-ui/svg-icons/maps/local-florist';

const Giardino = () => {
  const iconStyle = { height: 50, width: 50 };
  return <FlowerIcon color="#fff" style={iconStyle} />;
};

const Comfort = () => <span className="thermometer" />;


export default {
  Giardino,
  Comfort
};
