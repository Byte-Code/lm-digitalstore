import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding};
`;

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    backgroundColor: '#ffffff',
    padding: 0
  }

  render() {
    const { children, backgroundColor, padding } = this.props;

    return (
      <PageWrapper
        backgroundColor={backgroundColor}
        padding={padding}
      >
        {children}
      </PageWrapper>
    );
  }
}
