import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background: ${props => props.background};
  padding: ${props => props.padding};
  height: ${props => props.height};
  min-height: 1920px;
`;

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    background: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    background: '#ffffff',
    padding: 0,
    height: 'auto'
  }

  render() {
    const { children, background, padding, height } = this.props;

    return (
      <PageWrapper
        background={background}
        padding={padding}
        height={height}
      >
        {children}
      </PageWrapper>
    );
  }
}
