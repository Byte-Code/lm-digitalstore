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
import ScrollableDiv from './ScrollableDiv';

export default class ProductInfoBadge extends Component {
  static propTypes = {
    price: ImmutablePropTypes.map.isRequired,
    pricingInfo: ImmutablePropTypes.map.isRequired,
    currentStoreStock: ImmutablePropTypes.map,
    allStoreStock: ImmutablePropTypes.list.isRequired,
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    productSlug: PropTypes.string.isRequired,
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired
  };

  static defaultProps = {
    currentStoreStock: fromJS({
      storeStock: 0,
      stockStatus: 'notAvailable'
    })
  };

  constructor(props) {
    super(props);
    this.scrollValue = 0;
    this.isPositionFixed = false;
    this.visibilityValue = 855;
    this.allVisible = true;
    this.visibilityTreshold = 300;
    this.onScrolling = this.onScrolling.bind(this);
    this.checkScrollingThreshold = this.checkScrollingThreshold.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.update = this.update.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
    this.state = {
      visibility: true
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const stateChanged = !fromJS(nextState).equals(fromJS(this.state));
    if (stateChanged) {
      return true;
    }
  }

  onScrolling(scrollValue) {
    this.scrollValue = scrollValue;
    this.isPositionFixed = true;
    this.checkVisibility();
    this.checkScrollingThreshold();
  }

  toggleVisibility() {
    this.allVisible = !this.allVisible;
    this.update();
  }

  update() {
    this.forceUpdate();
  }

  updateVisibility() {
    this.setState({ visibility: !this.state.visibility });
  }

  checkVisibility() {
    const { scrollValue, visibilityValue } = this;
    const overThreshold = scrollValue >= visibilityValue && this.state.visibility;
    const belowThreshold = scrollValue < visibilityValue && !this.state.visibility;
    if (overThreshold || belowThreshold) {
      this.updateVisibility();
    }
  }

  purchaseLabel() {
    return this.allVisible ? 'Acquista online' : '';
  }

  checkScrollingThreshold() {
    const { scrollValue, visibilityTreshold, allVisible } = this;
    const shouldCollapse = scrollValue >= visibilityTreshold && allVisible;
    const shouldExpand = scrollValue < visibilityTreshold && !allVisible;
    if (shouldCollapse || shouldExpand) {
      this.toggleVisibility();
    }
  }

  render() {
    const {
      price,
      pricingInfo,
      currentStoreStock,
      allStoreStock,
      productName,
      productCode,
      productSlug,
      marketingAttributes,
      loyaltyProgram,
    } = this.props;

    const { allVisible } = this;
    const dividerStyle = { display: allVisible ? '' : 'none' };

    return (
      <Wrapper visibility={this.state.visibility}>
        <ScrollableDiv onScrolling={this.onScrolling}>
          <MarketingFlag
            marketingAttributes={marketingAttributes}
            loyaltyProgram={loyaltyProgram}
          />
          <PriceBadge pricingInfo={pricingInfo} price={price} />
          <Divider style={dividerStyle} />
          <StoreStockWrapper id="storeStockWrapper" display={allVisible}>
            <StoreStockBadge currentStoreStock={currentStoreStock} />
          </StoreStockWrapper>
          <AvailabilityButton
            productName={productName}
            productCode={productCode}
            allStoreStock={allStoreStock}
            collapse={allVisible}
          />
          <Divider style={dividerStyle} />
          <PurchaseDialog productCode={productCode} productSlug={productSlug}>
            <Button background="#67cb33" notCollapse={allVisible} value="">
              {this.purchaseLabel()}
            </Button>
          </PurchaseDialog>
        </ScrollableDiv>
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div(({ visibility = true }) => ({
  width: '255px',
  flexDirection: 'column',
  padding: '10px',
  backgroundColor: '#f7f7f7',
  visibility: 'visible',
  opacity: visibility ? 1 : 0,
  transition: visibility
    ? ''
    : 'max-height 1.00s, opacity 1.00s',
  maxHeight: visibility ? '100%' : 'auto'
}));

const Divider = glamorous.div({
  border: '1px dashed #333333',
  width: '100%',
  margin: '15px 0'
});

const Button = glamorous.div(
  ({ background = 'white', notCollapse = true }) => ({
    width: '100%',
    textTransform: 'uppercase',
    background,
    height: '60px',
    display: notCollapse ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 0 8px 0 rgba(51, 51, 51, 0.1)',
    cursor: 'pointer'
  })
);

const StoreStockWrapper = glamorous.div(({ display = true }) => ({
  marginBottom: '20px',
  display: display ? '' : 'none'
}));
