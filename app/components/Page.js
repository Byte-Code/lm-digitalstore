import React, { Component, PropTypes } from 'react';
import glamorous from 'glamorous';

const PageWrapper = glamorous.div(({ background, padding, height }) => ({
  background,
  padding,
  height,
  minHeight: 1920
}));

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    background: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    background: '#ffffff',
    padding: 0,
    height: 'auto'
  };

  render() {
    const { children, background, padding, height } = this.props;

    return (
      <PageWrapper background={background} padding={padding} height={height}>
        {children}
      </PageWrapper>
    );
  }
}
