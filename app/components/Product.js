import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, fromJS } from 'immutable';
import glamorous from 'glamorous';
import throttle from 'lodash/throttle';
import inRange from 'lodash/inRange';

import ImageSlider from './ImageSlider';
import ProductInfo from './ProductInfo';
import ProductInfoBadge from './ProductInfoBadge';
import SimilarProducts from './SimilarProducts';
import ScrollableDiv from './ScrollableDiv';


export default class Product extends Component {
  static propTypes = {
    params: PropTypes.shape({
      productCode: PropTypes.string.isRequired
    }).isRequired,
    productInfo: ImmutablePropTypes.map,
    similarProductStocks: ImmutablePropTypes.map,
    requestFetchProduct: PropTypes.func.isRequired,
    clearProductList: PropTypes.func.isRequired,
    clearRealTimeStock: PropTypes.func.isRequired,
    setAnalyticsProductClick: PropTypes.func.isRequired,
    analyticsOpenOverlay: PropTypes.func.isRequired,
    analyticsSwipeOverlay: PropTypes.func.isRequired,
    trackPurchaseEvent: PropTypes.func.isRequired,
    similarProducts: ImmutablePropTypes.list.isRequired,
    hasNearbyStores: PropTypes.bool.isRequired,
    mainStoreStock: PropTypes.number.isRequired,
    storeCode: PropTypes.string.isRequired
  };

  static defaultProps = {
    productInfo: Map(),
    storeStock: Map(),
    similarProductStocks: Map(),
    mainStoreStock: 0
  };

  constructor(props) {
    super(props);
    this.throttleValue = 500;
    this.initialState = { scrollValue: 0, opacity: 1 };
    this.onScrolling = this.onScrolling.bind(this);
    this.setScrollValue = this.setScrollValue.bind(this);
    this.renderAnimatedTitle = this.renderAnimatedTitle.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    this.setOpacityValue = this.setOpacityValue.bind(this);
    this.resetAnimationValue = this.resetAnimationValue.bind(this);
    this.state = this.initialState;
  }

  componentDidMount() {
    const { params: { productCode }, requestFetchProduct } = this.props;
    requestFetchProduct(productCode);
  }

  componentWillReceiveProps(nextProps) {
    const prevProductCode = this.props.params.productCode;
    const { params: { productCode }, requestFetchProduct } = nextProps;

    if (prevProductCode !== productCode) {
      requestFetchProduct(productCode);
      this.resetAnimationValue();
    }
  }

  componentWillUnmount() {
    this.props.clearRealTimeStock();
    this.props.clearProductList();
  }


  onScrolling(scrollValue) {
    this.setScrollValue(scrollValue);
    this.setOpacity();
  }

  setScrollValue(scrollValue) {
    (throttle(() => {
      this.setState({ scrollValue });
    }, this.throttleValue))();
  }

  setOpacityValue(opacity) {
    (throttle(() => {
      this.setState({ opacity });
    }, this.throttleValue))();
  }

  setOpacity() {
    const { scrollValue } = this.state;
    let { opacity } = this.state;

    if (this.state.scrollValue) {
      if (inRange(scrollValue, 1, 400)) opacity = 0.75;
      if (inRange(scrollValue, 401, 600)) opacity = 0.5;
      if (inRange(scrollValue, 601, 1078)) opacity = 0.25;
      if (inRange(scrollValue, 1079, 2000)) opacity = 0;
    }
    this.setOpacityValue(opacity);
  }

  resetAnimationValue() {
    this.setState(this.initialState);
  }

  renderSimilarProducts() {
    const { similarProducts, productInfo,
      storeCode, similarProductStocks } = this.props;

    if (similarProducts.isEmpty()) {
      return null;
    }

    const relatedProd = productInfo.get('similarProducts');

    return relatedProd.map(sp => {
      const products = similarProducts.filter(p => sp.get('products').includes(p.get('code')));
      return (
        <SimilarProducts
          key={sp.get('name')}
          similarProducts={products}
          title={sp.get('name')}
          setAnalyticsProductClick={this.props.setAnalyticsProductClick}
          storeCode={storeCode}
          stocks={similarProductStocks}
          analyticsOpenOverlay={this.props.analyticsOpenOverlay}
          analyticsSwipeOverlay={this.props.analyticsSwipeOverlay}
        />
      );
    });
  }

  renderAnimatedTitle(config) {
    const { name, code } = config;
    const isShadowBox = this.state.scrollValue >= 1100;
    return (
      isShadowBox ?
        <FixedTitleWrapper>
          <Title>{name}</Title>
          <Ref>{`REF. ${code}`}</Ref>
        </FixedTitleWrapper> : <div />
    );
  }


  render() {
    const { productInfo, hasNearbyStores, mainStoreStock, trackPurchaseEvent } = this.props;

    if (productInfo.isEmpty()) {
      return null;
    }

    const name = productInfo.getIn(['basicInfo', 'data', 'name']);
    const code = productInfo.getIn(['basicInfo', 'data', 'code']);
    const slug = productInfo.getIn(['basicInfo', 'data', 'slug']);
    const productType = productInfo.getIn(['basicInfo', 'data', 'productDetail', 'descriptionType']);
    const marketingDescriptions = productInfo.getIn(
      ['basicInfo', 'data', 'productDetail', 'marketingDescriptions']
    );
    const marketingAttributes = productInfo.getIn(['basicInfo', 'data', 'marketingAttributes']);
    const loyaltyProgram = productInfo.getIn(['basicInfo', 'data', 'loyaltyProgram']);
    const descriptions = productInfo.getIn(['basicInfo', 'data', 'productDetail', 'descriptions']);
    const price = productInfo.getIn(['price', 'data', 'selling']);
    const pricingInfo = productInfo.getIn(['basicInfo', 'data', 'pricingInformations']);
    const imageIDList = productInfo.getIn(['basicInfo', 'data', 'images']);
    const imageOptions = { width: 1080, height: 1080, crop: 'fit' };
    let currentStoreStock = fromJS({});

    if (mainStoreStock) {
      currentStoreStock = fromJS({
        storeStock: mainStoreStock,
        stockStatus: productInfo.getIn(['productStockInfo', 'vendibilityValue'])
      });
    }

    return (
      <Wrapper>
        <ScrollableDiv onScrolling={this.onScrolling}>
          <Title>{name}</Title>
          <Ref>{`REF. ${code}`}</Ref>
          {this.renderAnimatedTitle({ name, code })}
          <SliderWrapper opacity={this.state.opacity}>
            <ImageSlider imageIDList={imageIDList} imageOptions={imageOptions} alt={name} />
          </SliderWrapper>
          <ProductInfo
            productType={productType}
            marketingDescriptions={marketingDescriptions}
            descriptions={descriptions}
          />
          <SimilarProductsWrapper>
            {this.renderSimilarProducts()}
          </SimilarProductsWrapper>
          <PriceWrapper>
            <ProductInfoBadge
              productName={name}
              productCode={code}
              productSlug={slug}
              pricingInfo={pricingInfo}
              currentStoreStock={currentStoreStock}
              marketingAttributes={marketingAttributes}
              loyaltyProgram={loyaltyProgram}
              price={price}
              scrollValue={this.state.scrollValue}
              hasNearbyStores={hasNearbyStores}
              trackPurchaseEvent={trackPurchaseEvent}
            />
          </PriceWrapper>
        </ScrollableDiv>
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div({
  position: 'relative'
});

const Title = glamorous.h1({
  padding: '40px 100px 0',
  textAlign: 'center',
  fontSize: 48,
  lineHeight: '70px',
  textTransform: 'capitalize'
});

const Ref = glamorous.h3({
  textTransform: 'uppercase',
  fontSize: 16,
  lineHeight: '24px',
  textAlign: 'center',
  marginBottom: 16
});

const SliderWrapper = glamorous.div(({ opacity }) => ({
  width: '100%',
  opacity
}));

const PriceWrapper = glamorous.div({
  position: 'fixed',
  right: '2%',
  top: '12%'
});

const SimilarProductsWrapper = glamorous.div({
  margin: '60px 0 0',
  '&>div': {
    marginBottom: 80
  }
});

const FixedTitleWrapper = glamorous.div({
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0px 6px 5px #888888',
  zIndex: 1,
  position: 'fixed',
  top: '0px'
});
