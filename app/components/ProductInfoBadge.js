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
    this.isCollapsed = false;
    this.onScrolling = this.onScrolling.bind(this);
    this.checkScrollingThreshold = this.checkScrollingThreshold.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.update = this.update.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getAnimatedWrapperHeight = this.getAnimatedWrapperHeight.bind(this);
    this.animatedWrapperHeight = 0;
    this.initialHeight = 0;
    this.state = {
      visibility: true
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const animatedWrapper = window.document.getElementById('AnimatedWrapper');
    let shouldUpdate = false;
    this.animatedWrapperHeight = animatedWrapper.offsetHeight;
    if (this.animatedWrapperHeight > 1 && !this.initialHeight) {
      shouldUpdate = true;
      this.initialHeight = `${this.animatedWrapperHeight}`;
    }

    const stateChanged = !fromJS(nextState).equals(fromJS(this.state));
    if (stateChanged || shouldUpdate) {
      return true;
    }
  }

  onScrolling(scrollValue) {
    this.scrollValue = scrollValue;
    this.isPositionFixed = true;
    this.checkVisibility();
    this.checkScrollingThreshold();
  }

  getAnimatedWrapperHeight() {
    return this.getHeight();
  }

  getHeight() {
    const isFirstRender = !this.initialHeight;
    let height = isFirstRender ? 'auto' : this.initialHeight;

    if (!this.allVisible) {
      height = '0px';
    }
    return height;
  }

  checkScrollingThreshold() {
    const { scrollValue, visibilityTreshold, allVisible } = this;
    const shouldCollapse = scrollValue >= visibilityTreshold && allVisible;
    const shouldExpand = scrollValue < visibilityTreshold && !allVisible;
    if (shouldCollapse || shouldExpand) {
      this.toggleVisibility();
    }
  }

  checkVisibility() {
    const { scrollValue, visibilityValue } = this;
    const overThreshold =
      scrollValue >= visibilityValue && this.state.visibility;
    const belowThreshold =
      scrollValue < visibilityValue && !this.state.visibility;
    if (overThreshold || belowThreshold) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    this.setState({ visibility: !this.state.visibility });
  }

  update() {
    this.forceUpdate();
  }

  toggleVisibility() {
    this.allVisible = !this.allVisible;
    this.update();
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

    const height = this.getAnimatedWrapperHeight();

    return (
      <Wrapper visibility={this.state.visibility}>
        <ScrollableDiv onScrolling={this.onScrolling}>
          <MarketingFlag
            marketingAttributes={marketingAttributes}
            loyaltyProgram={loyaltyProgram}
          />
          <PriceBadge pricingInfo={pricingInfo} price={price} />
          <AnimatedWrapper id="AnimatedWrapper" height={height}>
            <Divider />
            <StoreStockWrapper>
              <StoreStockBadge currentStoreStock={currentStoreStock} />
            </StoreStockWrapper>
            <AvailabilityButton
              productName={productName}
              productCode={productCode}
              allStoreStock={allStoreStock}
            />
            <Divider />
            <PurchaseDialog productCode={productCode} productSlug={productSlug}>
              <Button background="#67cb33" value="">
                Acquista online
              </Button>
            </PurchaseDialog>
          </AnimatedWrapper>
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
  transition: 'opacity 0.5s'
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

const AnimatedWrapper = glamorous.div(({ height }) => ({
  height,
  overflow: 'hidden',
  transition: 'height 0.5s linear'
}));
