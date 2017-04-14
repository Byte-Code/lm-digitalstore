import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import styled from 'styled-components';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-forward';

import MarketingFlag from './MarketingFlag';
import PriceBadge from './PriceBadge';
import Image from './Image';
import StoreStockBadge from '../containers/StoreStockBadge';

const Wrapper = styled.div`
  width: 830px;
  height: 1420px;
  background: #fff;
  display: flex;
  flex-direction: column;
  color: #000;
`;

const Title = styled.h1`
  margin: 40px 40px 0;
  text-align: center;
  font-size: 48px;
  height: 70px;
  overflow: hidden;
  text-size-adjust: auto;
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 65px;
  background: #f7f7f7;
  flex: 1;
  &>* {
    width: 50%;
  }
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const PriceAndStock = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 85px;
`;

const Quantity = styled.p`
  font-size: 14px;
  font-family: LeroyMerlinSans Light;
`;

const Divider = styled.div`
  border: 1px dashed #333333;
  width: 100%;
  margin: 34px 0;
`;

const Button = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #67cb33;
  color: #fff;
  font-size: 28px;
  font-family: LeroyMerlinSans Bold;
`;

const SimilarProductBadge = (props) => {
  const { productInfo } = props;
  const name = productInfo.get('name');
  const code = productInfo.get('code');
  const description = productInfo.getIn(['productDetail', 'shortDescription']);
  const price = productInfo.getIn(['price', 'selling']);
  const pricingInfo = productInfo.get('pricingInformations');
  const currentStoreStock = productInfo.get('storeStock');
  const marketingAttributes = productInfo.get('marketingAttributes');
  const loyaltyProgram = productInfo.get('loyaltyProgram');
  const image = productInfo.get('mainImage');
  const imageOptions = { width: 830, height: 830, crop: 'fit' };

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Ref>REF. {code}</Ref>
      <Image
        imageID={image}
        fixBrightColor
        alt="alt"
        imageOptions={imageOptions}
      />
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
          <ArrowIcon color="#fff" style={{ height: 32, width: 37, marginLeft: 10 }} />
        </Button>
      </Link>
    </Wrapper>
  );
};

SimilarProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map.isRequired
};

export default SimilarProductBadge;
