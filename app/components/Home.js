import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import FamilyBadge from './FamilyBadge';

const Title = styled.h1`
  font-size: 60px;
  font-weight: normal;
  line-height: 1.17;
  color: #333333;
  height: 140px;
  margin: 98px 40px 0;
`;

const InnerWrapper = styled.div`
  margin: 60px 40px 0;
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

    const title = world.get('title');
    const families = world.get('families');

    return (
      <div>
        <Title>{title}</Title>
        <InnerWrapper>
          <FamilyBadge family={families.get(0)} />
        </InnerWrapper>
      </div>
    );
  }
}
