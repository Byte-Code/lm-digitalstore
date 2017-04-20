import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import styled from 'styled-components';

import ImageSlider from './ImageSlider';
import ProductInfo from './ProductInfo';
import ProductInfoBadge from './ProductInfoBadge';
import SimilarProducts from './SimilarProducts';

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.h1`
  margin: 40px 40px 0;
  text-align: center;
  font-size: 48px;
  line-height: 70px;
  text-transform: capitalize;
`;

const Ref = styled.h3`
  text-transform: uppercase;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

const SliderWrapper = styled.div`
  width: 100%;
`;

const PriceWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 234px;
`;

const SimilarProductsWrapper = styled.div`
  margin: 60px 0 0;
  &>div {
    margin-bottom: 80px;
  }
`;

export default class Product extends Component {
  static propTypes ={
    params: PropTypes.shape({
      productCode: PropTypes.string.isRequired
    }).isRequired,
    productInfo: ImmutablePropTypes.map,
    requestFetchProduct: PropTypes.func.isRequired,
    storeCode: PropTypes.string.isRequired
  }

  static defaultProps = {
    productInfo: Map()
  }

  componentDidMount() {
    const { params: { productCode }, requestFetchProduct } = this.props;
    requestFetchProduct(productCode);
  }

  componentDidUpdate(prevProps) {
    const prevProductCode = prevProps.params.productCode;
    const { params: { productCode }, requestFetchProduct } = this.props;

    if (prevProductCode !== productCode) {
      requestFetchProduct(productCode);
    }
  }

  renderSimilarProducts() {
    const { productInfo } = this.props;
    const similarProducts = productInfo.get('similarProducts');

    if (!similarProducts) {
      return null;
    }

    return similarProducts.map((sp, key) => (
      <SimilarProducts
        key={key}
        similarProducts={sp}
        title={key}
      />
    )).toList();
  }

  render() {
    const { productInfo, storeCode } = this.props;

    if (productInfo.isEmpty()) {
      return null;
    }

    const name = productInfo.get('name');
    const code = productInfo.get('code');
    const productType = productInfo.getIn(['productDetail', 'descriptionType']);
    const marketingDescriptions = productInfo.getIn(['productDetail', 'marketingDescriptions']);
    const marketingAttributes = productInfo.get('marketingAttributes');
    const loyaltyProgram = productInfo.get('loyaltyProgram');
    const descriptions = productInfo.getIn(['productDetail', 'descriptions']);
    const price = productInfo.getIn(['price', 'selling']);
    const pricingInfo = productInfo.get('pricingInformations');
    // TODO this data should't arrive from here, selector Maybe?
    const allStoreStock = productInfo.get('allStoreStock') || List();
    const currentStoreStock = allStoreStock.find(s => s.get('storeCode') === storeCode);
    const imageIDList = productInfo.get('images');
    const imageOptions = { width: 1080, height: 1080, crop: 'fit' };

    return (
      <Wrapper>
        <Title>{name}</Title>
        <Ref>{`REF. ${code}`}</Ref>
        <SliderWrapper>
          <ImageSlider
            imageIDList={imageIDList}
            imageOptions={imageOptions}
            alt={name}
          />
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
