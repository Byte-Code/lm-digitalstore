import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';

import MarketingBadge from './MarketingBadge';
import { getPromotions, buildPromotionMap } from '../utils/marketingUtils';

export default class MarketingFlag extends Component {
  static propTypes = {
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired,
    wrapperStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    topLeftStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    topRightStyle: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    wrapperStyle: {},
    topLeftStyle: {},
    topRightStyle: {},
    promotionCode: '0'
  };

  renderBadges() {
    const { marketingAttributes, loyaltyProgram,
      wrapperStyle, topLeftStyle, topRightStyle } = this.props;
    const promotions = getPromotions(marketingAttributes, loyaltyProgram);
    const promotionMap = buildPromotionMap({ promotions });
    const topRight = promotionMap.get('topRight');
    const topLeft = promotionMap.get('topLeft');

    return (
      <Wrapper wrapperStyle={wrapperStyle}>
        {
          topLeft &&
          <TopLeft topLeftStyle={topLeftStyle} >
            <MarketingBadge promotion={topLeft} key={topLeft.get('code')} />
          </TopLeft>
        }
        {
          topRight &&
          <TopRight topLeft={topLeft} topRightStyle={topRightStyle} >
            <MarketingBadge promotion={topRight} key={topRight.get('code')} />
          </TopRight>
        }
      </Wrapper>
    );
  }

  render() {
    return this.renderBadges();
  }
}

const Wrapper = glamorous.div(props => props.wrapperStyle);
const TopRight = glamorous.div(props => {
  const hasTopLeft = props.topLeft.get('code');
  if (!hasTopLeft && Object.keys(props.topRightStyle).length > 0) {
    if (props.topRightStyle['&>img']) {
      Object.assign(props.topRightStyle['&>img'], { marginTop: '20px !important' });
    }
  }
  return props.topRightStyle;
});
const TopLeft = glamorous.div(props => props.topLeftStyle);
