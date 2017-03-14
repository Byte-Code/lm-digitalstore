import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import FamilyBadge from './FamilyBadge';

const InnerWrapper = styled.div`
`;

export default class Home extends Component {
  static propTypes = {
    fetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map
  }

  static defaultProps = {
    world: Map()
  }

  componentDidMount() {
    this.props.fetchWorld();
  }

  render() {
    const { world } = this.props;

    if (world.isEmpty()) {
      return null;
    }

    const families = world.get('families');

    return (
      <div>
        <InnerWrapper>
          <FamilyBadge family={families.get(0)} size="square-big" />
        </InnerWrapper>
      </div>
    );
  }
}
