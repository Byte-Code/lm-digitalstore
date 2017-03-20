import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import FamilyBadge from './FamilyBadge';

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  &>div {
    width: calc(50% - 10px);
  }
`;

const GridWrapper = styled(FlexWrapper)`
  padding: 47px 40px 0;
`;

const DoubleVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Banner = styled.div`
  background: url(${props => props.url}) center no-repeat border-box padding-box;
  height: 305px;
  font-size: 32px;
  padding: 30px 60px 47px 20px;
  color: #fff;
  font-family: LeroyMerlinSans Italic;
`;

const WorldTitle = styled.section`
  height: 140px;
  color: black;
  font-family: LeroyMerlinSans Bold;
  margin: 53px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>div {
    font-size: 54px;
    width: calc(100% - 200px);
    &>span{
      color: #58c527;
    }
  }
  &>img {
    height: 128px;
    width: 213px;
  }
`;

export default class Home extends Component {
  static propTypes = {
    requestFetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map
  }

  static defaultProps = {
    world: Map()
  }

  componentDidMount() {
    this.props.requestFetchWorld();
  }

  render() {
    const { world } = this.props;

    if (world.isEmpty()) {
      return null;
    }

    const worldName = world.get('worldName');
    const families = world.get('families');
    const bannerText = world.getIn(['banner', 'text']);
    const bannerImg = world.getIn(['banner', 'image']);
    const trailingImage = world.get('trailingImage');

    return (
      <div>
        <GridWrapper>
          <div>
            <FamilyBadge family={families.get(0)} size="square-big" />
            <FlexWrapper>
              <DoubleVertical>
                <FamilyBadge family={families.get(1)} size="square-small" />
                <FamilyBadge family={families.get(2)} size="square-small" />
              </DoubleVertical>
              <FamilyBadge family={families.get(4)} size="vertical" />
            </FlexWrapper>
            <FamilyBadge family={families.get(7)} size="horizontal" />
          </div>
          <div>
            <FlexWrapper>
              <FamilyBadge family={families.get(6)} size="square-small" />
              <Banner url={bannerImg}>{bannerText}</Banner>
            </FlexWrapper>
            <FamilyBadge family={families.get(3)} size="square-big" />
            <FlexWrapper>
              <FamilyBadge family={families.get(9)} size="square-small" />
              <FamilyBadge family={families.get(8)} size="square-small" />
              <FamilyBadge family={families.get(5)} size="square-small" />
              <FamilyBadge family={families.get(10)} size="square-small" />
            </FlexWrapper>
          </div>
          <WorldTitle>
            <div>Esplora le soluzioni Leroy Merlin per
            <span>&nbsp;{worldName}</span></div>
            <img src="./assets/logo.png" alt="logo" />
          </WorldTitle>
        </GridWrapper>
        <img src={trailingImage} alt="alt" />
      </div>
    );
  }
}
