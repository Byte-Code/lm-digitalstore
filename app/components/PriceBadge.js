import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { formatPrice } from '../utils/utils';

const Discount = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 5px;
  &>span {
    &:first-child {
      color: #cc0000;
    }
    color: #000;
    text-decoration: line-through;
  }
`;

const MainPrice = styled.p`
  font-size: 36px;
  text-align: right;
  margin-bottom: 3px;
  color: ${props => (props.isDiscounted ? '#cc0000' : '#000')};
`;

const Quantity = styled.p`
  font-size: 14px;
  font-family: LeroyMerlinSans Light;
  text-align: right;
`;

export default class PriceBadge extends Component {
  static propTypes = {
    pricingInfo: ImmutablePropTypes.map.isRequired
  }

  render() {
    const { pricingInfo } = this.props;

    const grossPrice = pricingInfo.get('gross');
    const listPrice = pricingInfo.get('list');
    const isDiscounted = listPrice && true;
    const discount = pricingInfo.get('discount');

    return (
      <div>
        {isDiscounted &&
          <Discount>
            <span>-{Math.ceil(discount)} &#37;</span>
            <span>{formatPrice(listPrice)}&#8364;</span>
          </Discount>
        }
        <MainPrice isDiscounted={isDiscounted}>
          {grossPrice} &#8364;
        </MainPrice>
        <Quantity>1 pz / pz</Quantity>
      </div>
    );
  }
}
