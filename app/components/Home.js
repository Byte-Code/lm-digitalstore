import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import FamilyBadge from './FamilyBadge';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &>div {
    width: calc(50% - 10px);
  }
`;

const Column = styled.div`
  &>div {
    margin-bottom: 20px;
  }
`;

const DoubleVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Banner = styled.div`
  background: url(${props => props.url}) center repeat border-box padding-box;
  height: 305px;
  font-size: 32px;
  padding: 30px 20px 47px;
  color: #fff;
  font-weight: bold;
  font-style: italic;
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
    const bannerText = world.getIn(['banner', 'text']);
    const bannerImg = world.getIn(['banner', 'image']);

    return (
      <FlexWrapper>
        <Column>
          <FamilyBadge family={families.get(0)} size="square-big" />
          <FlexWrapper>
            <DoubleVertical>
              <FamilyBadge family={families.get(1)} size="square-small" />
              <FamilyBadge family={families.get(2)} size="square-small" />
            </DoubleVertical>
            <FamilyBadge family={families.get(4)} size="vertical" />
          </FlexWrapper>
          <FamilyBadge family={families.get(7)} size="horizontal" />
        </Column>
        <Column>
          <FlexWrapper>
            <FamilyBadge family={families.get(6)} size="square-small" />
            <Banner url={bannerImg}>{bannerText}</Banner>
          </FlexWrapper>
          <FamilyBadge family={families.get(3)} size="square-big" />
          <FlexWrapper>
            <DoubleVertical>
              <FamilyBadge family={families.get(9)} size="square-small" />
              <FamilyBadge family={families.get(5)} size="square-small" />
            </DoubleVertical>
            <FamilyBadge family={families.get(8)} size="vertical" />
          </FlexWrapper>
        </Column>
      </FlexWrapper>
    );
  }
}
