import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { fromJS } from 'immutable';
import glamorous from 'glamorous';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-forward';

import MarketingFlag from './MarketingFlag';
import PriceBadge from './PriceBadge';
import Image from './Image';
import StoreStockBadge from '../containers/StoreStockBadge';

const Wrapper = glamorous.div({
  width: '830px',
  height: '1420px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  color: '#000'
});

const Title = glamorous.h1({
  margin: '40px 50px 0',
  textAlign: 'center',
  fontSize: '48px',
  height: '70px',
  overflow: 'hidden',
  textSizeAdjust: 'auto',
  lineHeight: '70px',
  textTransform: 'capitalize'
});

const Ref = glamorous.h3({
  textTransform: 'uppercase',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  marginBottom: '16px'
});

const InfoWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  padding: '40px 65px',
  background: '#f7f7f7',
  flex: 1,
  '&>*': {
    width: '50%'
  }
});

const Description = glamorous.p({
  fontSize: '14px',
  lineHeight: '20px'
});

const PriceAndStock = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '85px'
});

const Quantity = glamorous.p({
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Light'
});

const Divider = glamorous.div({
  border: '1px dashed #333333',
  width: '100%',
  margin: '34px 0'
});

const Button = glamorous.div({
  width: '100%',
  height: '115px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#67cb33',
  color: '#fff',
  fontSize: '28px',
  fontFamily: 'LeroyMerlinSans Bold'
});

const iconStyle = { height: 32, width: 37, marginLeft: 10 };

const SimilarProductBadge = props => {
  const { productInfo } = props;
  const name = productInfo.get('name');
  const code = productInfo.get('code');
  const description = productInfo.getIn(['productDetail', 'shortDescription']);
  const price = productInfo.getIn(['price', 'selling']);
  const pricingInfo = productInfo.get('pricingInformations');
  const currentStoreStock = fromJS({
    storeStock: productInfo.get('storeStock'),
    stockStatus: productInfo.getIn(['productStockInfo', 'vendibilityValue'])
  });
  const marketingAttributes = productInfo.get('marketingAttributes');
  const loyaltyProgram = productInfo.get('loyaltyProgram');
  const image = productInfo.get('mainImage');
  const imageOptions = { width: 830, height: 830, crop: 'fit' };

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Ref>REF. {code}</Ref>
      <Image imageID={image} fixBrightColor alt="alt" imageOptions={imageOptions} />
      <InfoWrapper>
        <Description>{description}</Description>
        <PriceAndStock>
          <MarketingFlag
            marketingAttributes={marketingAttributes}
            loyaltyProgram={loyaltyProgram}
          />
          <PriceBadge pricingInfo={pricingInfo} price={price} />
          <Quantity>1 pz / pz</Quantity>
          <Divider />
          <StoreStockBadge currentStoreStock={currentStoreStock} />
        </PriceAndStock>
      </InfoWrapper>
      <Link to={`/product/${code}`}>
        <Button>
          Dettagli Prodotto
          <ArrowIcon color="#fff" style={iconStyle} />
        </Button>
      </Link>
    </Wrapper>
  );
};

SimilarProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map.isRequired
};

export default SimilarProductBadge;
