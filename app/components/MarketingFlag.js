import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import MarketingBadge from './MarketingBadge';
import { getPromotions, filterPromotions } from '../utils/marketingUtils';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export default class MarketingFlag extends Component {
  static propTypes = {
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired
  }

  renderBadges() {
    const { marketingAttributes, loyaltyProgram } = this.props;
    const promotions = getPromotions(marketingAttributes, loyaltyProgram);
    const filteredPromotions = filterPromotions(promotions);

    return filteredPromotions.map(p => <MarketingBadge promotion={p} key={p.get('code')} />);
  }

  render() {
    return (
      <Wrapper>
        {this.renderBadges()}
      </Wrapper>
    );
  }
}
