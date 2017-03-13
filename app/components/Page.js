import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const HRtop = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333333;
`;

export default class Page extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <HRtop />
        {children}
      </div>
    );
  }
}
