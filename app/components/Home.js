import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';

import FamilyBadge from './FamilyBadge';
import LogoLM from '../assets/logo.png';

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.div`
  padding-top: 66px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  &>img {
    width: 180px;
    height: 130px;
  }
`;

const GridWrapper = styled.div`
  padding: 16px 40px 40px;
`;

const DoubleVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Banner = styled.div`
  background: url(${props => props.url}) center no-repeat border-box padding-box;
  width: 100%;
  height: 120px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 30px;
  color: #fff;
  cursor: pointer;
  font-family: LeroyMerlinSans Bold-Italic;
`;

const TrailingImage = styled.img`
  width: 100%;
  height: 100px;
`;

const WorldTitle = styled.section`
  line-height: 88px;
  font-family: LeroyMerlinSans Italic;
  margin: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &>h1 {
    font-size: 36px;
    &>span{
      color: #58c527;
    }
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
        <Logo>
          <img src={LogoLM} alt="logo" />
        </Logo>
        <WorldTitle>
          <h1>Esplora le soluzioni Leroy Merlin per
          <span>&nbsp;{worldName}</span></h1>
        </WorldTitle>
        <GridWrapper>
          <Row>
            <FamilyBadge family={families.get(0)} size="square-big" />
            <DoubleVertical>
              <FamilyBadge family={families.get(1)} size="square-small" />
              <FamilyBadge family={families.get(2)} size="square-small" />
            </DoubleVertical>
            <DoubleVertical>
              <FamilyBadge family={families.get(3)} size="square-small" />
              <FamilyBadge family={families.get(4)} size="square-small" />
            </DoubleVertical>
          </Row>
          <Row>
            <FamilyBadge family={families.get(5)} size="square-small" />
            <FamilyBadge family={families.get(6)} size="horizontal" />
            <FamilyBadge family={families.get(7)} size="square-small" />
          </Row>
          <Row>
            <FamilyBadge family={families.get(8)} size="square-small" />
            <FamilyBadge family={families.get(9)} size="square-small" />
            <FamilyBadge family={families.get(10)} size="horizontal" />
          </Row>
          <Banner url={bannerImg}>
            {bannerText}
            <HelpIcon color="#fff" style={{ height: 65, width: 65 }} />
          </Banner>
        </GridWrapper>
        <TrailingImage src={trailingImage} alt="alt" />
      </div>
    );
  }
}
