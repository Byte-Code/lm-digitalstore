import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import glamorous from 'glamorous';

import MarketingFlag from './MarketingFlag';
import AvailabilityButton from './AvailabilityButton';
import PriceBadge from './PriceBadge';
import StoreStockBadge from '../containers/StoreStockBadge';
import PurchaseDialog from '../components/PurchaseDialog';

const Wrapper = glamorous.div({
  width: '255px',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  backgroundColor: '#f7f7f7'
});

const Divider = glamorous.div({
  border: '1px dashed #333333',
  width: '100%',
  margin: '15px 0'
});

const Button = glamorous.div(({ background }) => ({
  width: '100%',
  textTransform: 'uppercase',
  background,
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  boxShadow: '0 0 8px 0 rgba(51, 51, 51, 0.1)',
  cursor: 'pointer'
}));

const StoreStockWrapper = glamorous.div({
  marginBottom: '20px'
});

export default class ProductInfoBadge extends Component {
  static propTypes = {
    price: ImmutablePropTypes.map.isRequired,
    pricingInfo: ImmutablePropTypes.map.isRequired,
    currentStoreStock: ImmutablePropTypes.map,
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    productSlug: PropTypes.string.isRequired,
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired,
    hasNearbyStores: PropTypes.bool.isRequired
  };

  static defaultProps = {
    currentStoreStock: fromJS({
      storeStock: 0,
      stockStatus: 'notAvailable'
    })
  };

  render() {
    const {
      price,
      pricingInfo,
      currentStoreStock,
      productName,
      productCode,
      productSlug,
      marketingAttributes,
      loyaltyProgram,
      hasNearbyStores
    } = this.props;

    return (
      <Wrapper>
        <MarketingFlag marketingAttributes={marketingAttributes} loyaltyProgram={loyaltyProgram} />
        <PriceBadge pricingInfo={pricingInfo} price={price} />
        <Divider />
        <StoreStockWrapper>
          <StoreStockBadge currentStoreStock={currentStoreStock} />
        </StoreStockWrapper>
        {hasNearbyStores &&
          <AvailabilityButton productName={productName} productCode={productCode} />}
        <Divider />
        <PurchaseDialog productCode={productCode} productSlug={productSlug}>
          <Button background="#67cb33">
            Acquista online
          </Button>
        </PurchaseDialog>
      </Wrapper>
    );
  }
}
