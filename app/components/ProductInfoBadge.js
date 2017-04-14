import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
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
    price: ImmutablePropTypes.map.isRequired,
    pricingInfo: ImmutablePropTypes.map.isRequired,
    currentStoreStock: ImmutablePropTypes.map,
    allStoreStock: ImmutablePropTypes.list.isRequired,
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired
  }

  static defaultProps = {
    currentStoreStock: fromJS({
      storeStock: 0,
      stockStatus: 'notAvailable'
    })
  }

  render() {
    const {
      price,
      pricingInfo,
      currentStoreStock,
      allStoreStock,
      productName,
      productCode,
      marketingAttributes,
      loyaltyProgram
    } = this.props;

    return (
      <Wrapper>
        <MarketingFlag
          marketingAttributes={marketingAttributes}
          loyaltyProgram={loyaltyProgram}
        />
        <PriceBadge pricingInfo={pricingInfo} price={price} />
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
        />
      </Wrapper>
    );
  }
}
