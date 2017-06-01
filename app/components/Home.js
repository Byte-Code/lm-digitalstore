import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import TutorialButton from './TutorialButton';

import FamilyBadge from './FamilyBadge';
import LogoLM from '../assets/logo.png';

const Wrapper = glamorous.div({
  overflowY: 'hidden'
});

const Row = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%'
});

const Logo = glamorous.div({
  paddingTop: '66px',
  marginBottom: '27px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&>img': {
    width: '180px',
    height: '130px'
  }
});

const GridWrapper = glamorous.div({
  padding: '16px 40px 40px'
});

const DoubleVertical = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const Banner = glamorous.div(({ url = '/' }) => ({
  background: `url(${url}) center no-repeat border-box padding-box`,
  width: '100%',
  height: '120px',
  fontSize: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  marginTop: '30px',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'LeroyMerlinSans Bold-Italic'
}));

const TrailingImage = glamorous.img({
  width: '100%',
  height: '100px'
});

const WorldTitle = glamorous.section({
  lineHeight: '88px',
  fontFamily: 'LeroyMerlinSans Italic',
  margin: '0 40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&>h1': {
    fontSize: '36px',
    '&>span': {
      color: '#58c527'
    }
  }
});

const iconStyle = { height: 65, width: 65 };

export default class Home extends Component {
  static propTypes = {
    requestFetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map
  };

  static defaultProps = {
    world: Map()
  };

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
      <Wrapper>
        <Logo>
          <img src={LogoLM} alt="logo" />
        </Logo>
        <WorldTitle>
          <h1>
            Esplora le soluzioni Leroy Merlin per
            <span>&nbsp;{worldName}</span>
          </h1>
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
          <TutorialButton>
            <Banner url={bannerImg}>
              {bannerText}
              <HelpIcon color="#fff" style={iconStyle} />
            </Banner>
          </TutorialButton>
        </GridWrapper>
        <TrailingImage src={trailingImage} alt="alt" />
      </Wrapper>
    );
  }
}
