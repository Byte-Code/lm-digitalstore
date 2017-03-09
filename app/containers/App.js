import React, { Component } from 'react';
import styled from 'styled-components';

const HRtop = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333333;
`;

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        <HRtop />
        {this.props.children}
      </div>
    );
  }
}
