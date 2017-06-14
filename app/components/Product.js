import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, fromJS } from 'immutable';
import glamorous from 'glamorous';

import ImageSlider from './ImageSlider';
import ProductInfo from './ProductInfo';
import ProductInfoBadge from './ProductInfoBadge';
import SimilarProducts from './SimilarProducts';

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

const SliderWrapper = glamorous.div({
  width: '100%'
});

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

export default class Product extends Component {
  static propTypes = {
    params: PropTypes.shape({
      productCode: PropTypes.string.isRequired
    }).isRequired,
    productInfo: ImmutablePropTypes.map,
    requestFetchProduct: PropTypes.func.isRequired,
    clearProductList: PropTypes.func.isRequired,
    similarProducts: ImmutablePropTypes.list.isRequired,
    allStoreStock: ImmutablePropTypes.list.isRequired
  };

  static defaultProps = {
    productInfo: Map()
  };

  componentDidMount() {
    const { params: { productCode }, requestFetchProduct } = this.props;
    requestFetchProduct(productCode);
  }

  componentWillReceiveProps(nextProps) {
    const prevProductCode = this.props.params.productCode;
    const { params: { productCode }, requestFetchProduct } = nextProps;

    if (prevProductCode !== productCode) {
      requestFetchProduct(productCode);
    }
  }

  componentWillUnmount() {
    this.props.clearProductList();
  }
  renderSimilarProducts() {
    const { similarProducts, productInfo } = this.props;

    if (similarProducts.isEmpty()) {
      return null;
    }

    const relatedProd = productInfo.get('similarProducts');

    return relatedProd.map(sp => {
      const products = similarProducts.filter(p => sp.get('products').includes(p.get('code')));
      return (
        <SimilarProducts key={sp.get('name')} similarProducts={products} title={sp.get('name')} />
      );
    });
  }

  render() {
    const { productInfo, allStoreStock } = this.props;

    if (productInfo.isEmpty()) {
      return null;
    }

    const name = productInfo.get('name');
    const code = productInfo.get('code');
    const slug = productInfo.get('slug');
    const productType = productInfo.getIn(['productDetail', 'descriptionType']);
    const marketingDescriptions = productInfo.getIn(['productDetail', 'marketingDescriptions']);
    const marketingAttributes = productInfo.get('marketingAttributes');
    const loyaltyProgram = productInfo.get('loyaltyProgram');
    const descriptions = productInfo.getIn(['productDetail', 'descriptions']);
    const price = productInfo.getIn(['price', 'selling']);
    const pricingInfo = productInfo.get('pricingInformations');
    const currentStoreStock = fromJS({
      storeStock: productInfo.get('storeStock'),
      stockStatus: productInfo.getIn(['productStockInfo', 'vendibilityValue'])
    });
    const imageIDList = productInfo.get('images');
    const imageOptions = { width: 1080, height: 1080, crop: 'fit' };

    return (
      <Wrapper>
        <Title>{name}</Title>
        <Ref>{`REF. ${code}`}</Ref>
        <SliderWrapper>
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
            allStoreStock={allStoreStock}
            marketingAttributes={marketingAttributes}
            loyaltyProgram={loyaltyProgram}
            price={price}
          />
        </PriceWrapper>
      </Wrapper>
    );
  }
}
