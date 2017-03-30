import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const LinkBack = (props) => (
  <a onTouchTap={hashHistory.goBack}>
    {props.children}
  </a>
);

LinkBack.propTypes = {
  children: PropTypes.node.isRequired
};

export default LinkBack;