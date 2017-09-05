import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous, { Div } from 'glamorous';

const CardBody = glamorous.div(props => ({
  display: props.isVisible
}));

export default class Card extends Component {
  static propTypes = {
    TitleComponent: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleCard() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { TitleComponent, children } = this.props;
    const { expanded } = this.state;
    const isVisible = expanded ? 'block' : 'none';

    return (
      <div>
        <Div onClick={this.toggleCard.bind(this)}>
          <TitleComponent expanded={expanded} />
        </Div>
        <CardBody isVisible={isVisible} className="animated fadeIn">
          {children}
        </CardBody>
      </div>
    );
  }
}
