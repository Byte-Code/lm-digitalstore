import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';

const LinkBack = props => // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <a onClick={hashHistory.goBack}>{props.children}</a>;

LinkBack.propTypes = {
  children: PropTypes.node.isRequired
};

export default LinkBack;
