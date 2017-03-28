import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background: ${props => props.background};
  padding: ${props => props.padding};
  height: 1920px;
`;

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    background: PropTypes.string,
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    background: '#ffffff',
    padding: 0
  }

  render() {
    const { children, background, padding } = this.props;

    return (
      <PageWrapper
        background={background}
        padding={padding}
      >
        {children}
      </PageWrapper>
    );
  }
}
