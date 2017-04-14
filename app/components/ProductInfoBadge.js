import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import MarketingFlag from './MarketingFlag';
import PriceBadge from './PriceBadge';
import StoreStockBadge from '../containers/StoreStockBadge';
import AvailabilityButton from '../containers/AvailabilityButton';

const Wrapper = styled.div`
  width: 255px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f7f7f7;
`;

const Divider = styled.div`
  border: 1px dashed #333333;
  width: 100%;
  margin: 15px 0;
`;

const StoreStockWrapper = styled.div`
  margin-bottom: 20px;
`;

export default class ProductInfoBadge extends Component {
  static propTypes = {
    pricingInfo: ImmutablePropTypes.map.isRequired,
    currentStoreStock: PropTypes.number.isRequired,
    allStoreStock: ImmutablePropTypes.list.isRequired,
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired,
    promoWeb: ImmutablePropTypes.map.isRequired
  }

  render() {
    const {
      pricingInfo,
      currentStoreStock,
      allStoreStock,
      productName,
      productCode,
      marketingAttributes,
      promoWeb,
      loyaltyProgram
    } = this.props;
    console.log(marketingAttributes.toJS());
    console.log(loyaltyProgram.toJS());
    console.log(promoWeb.toJS());

    return (
      <Wrapper>
        <MarketingFlag
          marketingAttributes={marketingAttributes}
          loyaltyProgram={loyaltyProgram}
          promoWeb={promoWeb}
        />
        <PriceBadge pricingInfo={pricingInfo} />
        <Divider />
        <StoreStockWrapper>
          <StoreStockBadge
            currentStoreStock={currentStoreStock}
          />
        </StoreStockWrapper>
        <AvailabilityButton
          productName={productName}
          productCode={productCode}
          allStoreStock={allStoreStock}
          loyaltyProgram={loyaltyProgram}
          promoWeb={promoWeb}
        />
      </Wrapper>
    );
  }
}
