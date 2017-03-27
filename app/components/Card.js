import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const CardBody = styled.div`
  display: ${props => props.isVisible};
`;

export default class Card extends Component {
  static propTypes = {
    TitleComponent: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    titleText: PropTypes.string.isRequired,
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
    const { TitleComponent, children, titleText } = this.props;
    const { expanded } = this.state;
    const isVisible = expanded ? 'block' : 'none';

    return (
      <div>
        <div onTouchTap={this.toggleCard.bind(this)}>
          <TitleComponent>{titleText}</TitleComponent>
        </div>
        <CardBody isVisible={isVisible} className="animated slideInLeft">
          {children}
        </CardBody>
      </div>
    );
  }
}
