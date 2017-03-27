import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const CardBody = styled.div`
  display: ${props => props.isVisible};
`;

export default class Card extends Component {
  static propTypes = {
    CardTitle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleCard() {
    const currentState = this.state.expanded;
    this.setState({ expanded: !currentState });
  }

  render() {
    const { CardTitle, children } = this.props;
    const { expanded } = this.state;
    const isVisible = expanded ? 'block' : 'none';

    return (
      <div>
        <div onTouchTap={this.toggleCard.bind(this)}>
          <CardTitle>Hello</CardTitle>
        </div>
        <CardBody isVisible={isVisible}>
          {children}
        </CardBody>
      </div>
    );
  }
}
