import React from 'react';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import TutorialButton from '../TutorialButton';
import {Wrapper, Logo, WorldTitle, GridWrapper, iconStyle,Row, DoubleVertical, TrailingImage,
  Banner } from './styledComponents';

import FamilyBadge from '../FamilyBadge';
import LogoLM from '../../assets/logo.png';


export default function Giardino({ world = null }) {
  if (world) {
    const worldName = world.get('worldName');
    const families = world.get('families');
    const bannerText = world.getIn(['banner', 'text']);
    const bannerImg = world.getIn(['banner', 'image']);
    const trailingImage = world.get('trailingImage');

    return (
      <Wrapper>
        <Logo>
          <img src={LogoLM} alt="logo"/>
        </Logo>
        <WorldTitle>
          <h1>
            Esplora le soluzioni Leroy Merlin per
            <span>&nbsp;{worldName}</span>
          </h1>
        </WorldTitle>
        <GridWrapper>
          <Row>
            <FamilyBadge family={families.get(0)} size="square-big"/>
            <DoubleVertical>
              <FamilyBadge family={families.get(1)} size="square-small"/>
              <FamilyBadge family={families.get(2)} size="square-small"/>
            </DoubleVertical>
            <DoubleVertical>
              <FamilyBadge family={families.get(3)} size="square-small"/>
              <FamilyBadge family={families.get(4)} size="square-small"/>
            </DoubleVertical>
          </Row>
          <Row>
            <FamilyBadge family={families.get(5)} size="square-small"/>
            <FamilyBadge family={families.get(6)} size="square-small"/>
            <FamilyBadge family={families.get(7)} size="square-small"/>
            <FamilyBadge family={families.get(8)} size="square-small"/>
          </Row>
          <Row>
            <FamilyBadge family={families.get(9)} size="square-small"/>
            <FamilyBadge family={families.get(10)} size="square-small"/>
            <FamilyBadge family={families.get(11)} size="square-small"/>
            <FamilyBadge family={families.get(13)} size="square-small"/>
          </Row>
          <TutorialButton>
            <Banner url={bannerImg}>
              {bannerText}
              <HelpIcon color="#fff" style={iconStyle}/>
            </Banner>
          </TutorialButton>
        </GridWrapper>
        <TrailingImage src={trailingImage} alt="alt"/>
      </Wrapper>
    );
  }
}
