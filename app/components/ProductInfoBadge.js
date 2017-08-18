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
    hasNearbyStores: PropTypes.bool.isRequired,
    /*eslint-disable */
    scrollValue: PropTypes.number
    /*eslint-disable */
  };

  static defaultProps = {
    currentStoreStock: fromJS({
      storeStock: 0,
      stockStatus: 'notAvailable',
      scrollValue: 0
    })
  };

  constructor(props) {
    super(props);
    this.isPositionFixed = false;
    this.visibilityValue = 870;
    this.allVisible = true;
    this.visibilityTreshold = 300;
    this.isCollapsed = false;
    this.animatedWrapperHeight = 0;
    this.initialHeight = 0;
    this.onScrolling = this.onScrolling.bind(this);
    this.checkScrollingThreshold = this.checkScrollingThreshold.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.update = this.update.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getAnimatedWrapperHeight = this.getAnimatedWrapperHeight.bind(this);
    this.state = {
      visibility: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.onScrolling(nextProps.scrollValue);
  }

  componentWillUpdate(nextProps, nextState) {
    const animatedWrapper = window.document.getElementById('AnimatedWrapper');
    let shouldUpdate = false;
    if (animatedWrapper) {
      this.animatedWrapperHeight = animatedWrapper.offsetHeight;
    }
    if (this.animatedWrapperHeight > 1 && !this.initialHeight) {
      shouldUpdate = true;
      this.initialHeight = this.animatedWrapperHeight;
    }

    const stateChanged = !fromJS(nextState).equals(fromJS(this.state));
    if (stateChanged || shouldUpdate) {
      return true;
    }
  }

  onScrolling(scrollValue) {
    this.isPositionFixed = true;
    this.checkVisibility(scrollValue);
    this.checkScrollingThreshold(scrollValue);
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

  checkScrollingThreshold(scrollValue) {
    const { visibilityTreshold, allVisible } = this;
    const shouldCollapse = scrollValue >= visibilityTreshold && allVisible;
    const shouldExpand = scrollValue < visibilityTreshold && !allVisible;
    if (shouldCollapse || shouldExpand) {
      this.toggleVisibility();
    }
  }

  checkVisibility(scrollValue) {
    const { visibilityValue } = this;
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
      productName,
      productCode,
      productSlug,
      marketingAttributes,
      loyaltyProgram,
      hasNearbyStores
    } = this.props;

    const MarketingFlagStyle = {
      wrapperStyle: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      topLeftStyle: {
        '&>img': {
          marginTop: '-13px',
          marginLeft: '-14px'
        },
        '&>#novita_badge': {
          marginTop: '-9px',
          marginLeft: '-8px'
        }
      },
      topRightStyle: {

      }
    };

    const height = this.getAnimatedWrapperHeight();

    const promotionCode = price.getIn(['selling', 'promotion']);
    const marketingPriceProps = { marketingAttributes, loyaltyProgram, promotionCode };

    return (
      <Wrapper visibility={this.state.visibility}>
        <MarketingFlag {...marketingPriceProps} {...MarketingFlagStyle} />
        <PriceBadge pricingInfo={pricingInfo} price={price} />
        <AnimatedWrapper id="AnimatedWrapper" height={height}>
        <Divider />
        <StoreStockWrapper>
          <StoreStockBadge currentStoreStock={currentStoreStock} />
        </StoreStockWrapper>
          {hasNearbyStores &&
          <AvailabilityButton productName={productName} productCode={productCode} />}
        <Divider style={{}} />
        <PurchaseDialog productCode={productCode} productSlug={productSlug}>
          <Button background="#67cb33">
            Acquista online
          </Button>
        </PurchaseDialog>
        </AnimatedWrapper>
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
