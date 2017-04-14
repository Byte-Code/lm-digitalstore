import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import Image from './Image';
import { formatPrice } from '../utils/utils';

const Wrapper = styled.div`
  height: 593px;
  width: 405px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;
  font-size:0;
  &>div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 33px;
  }
`;

const Name = styled.div`
  line-height: 32px;
  font-size: 20px;
  font-family: LeroyMerlinSans Bold;
  text-transform: uppercase;
  text-align: center;
  margin: 10px 0;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
  &>p{
    margin-bottom: 10px;
  }
  &>div:nth-child(3) {
    margin-left: 20px;
  }
`;

const Price = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${props => (props.discounted ? '#cc0000' : '#000')};
  text-decoration: ${props => (props.isBarred ? 'line-through' : 'none')};
`;

const Discount = styled.p`
  font-size: 20px;
  color: #cc0000;
  text-align: center;
  width: 100%;
`;

const Available = styled.div`
  color: #339900;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 40px;
  bottom: 188px;
  &>p {
    font-family: LeroyMerlinSans Bold;
    font-size: 16px;
  }
  background: rgba(255, 255, 255, 0.8);
`;

// TODO create a more scalable component
const Corner = styled.section`
  height: 42px;
  width: 42px;
  background: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fSize};
  color: #fff;
  text-align: center;
  font-family: LeroyMerlinSans Bold;
  position: absolute;
  top: 0;
  right: 0;
`;

const MarketingCorner = ({ isDiscounted, isNew }) => {
  if (isDiscounted) {
    return <Corner bgColor="#cc0000" fSize="24px">%</Corner>;
  }
  if (isNew) {
    return <Corner bgColor="#6699cc" fSize="16px">NEW</Corner>;
  }
  return null;
};

MarketingCorner.propTypes = {
  isDiscounted: PropTypes.bool,
  isNew: PropTypes.bool
};

MarketingCorner.defaultProps = {
  isDiscounted: false,
  isNew: false
};

const ProductBadge = ({ productInfo, handleClick }) => {
  if (productInfo.isEmpty()) {
    return null;
  }
  const imageID = productInfo.get('mainImage');
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.get('name');
  const grossPrice = productInfo.getIn(['price', 'selling', 'gross']);
  const listPrice = productInfo.getIn(['price', 'selling', 'list']);
  const isDiscounted = listPrice && true && (listPrice - grossPrice > 1);
  const discount = productInfo.getIn(['price', 'selling', 'discount']);
  const isInStock = productInfo.get('storeStock') > 0;
  const isNew = productInfo.getIn(['marketingAttributes', 'newOnMarketEndDate']) && true;

  return (
    <Wrapper onClick={handleClick}>
      <Image
        imageID={imageID}
        imageOptions={imageOptions}
        alt={name}
      />
      <MarketingCorner
        isDiscounted={isDiscounted}
        isNew={isNew}
      />
      <Name>{name}</Name>
      <PriceWrapper>
        {isDiscounted && <Discount>-{Math.ceil(discount)} &#37;</Discount>}
        <Price isBarred={isDiscounted}>
          {formatPrice(listPrice) || formatPrice(grossPrice)} &#8364;
        </Price>
        {listPrice && <Price discounted>{formatPrice(grossPrice)} &#8364;</Price>}
      </PriceWrapper>
      {isInStock &&
      <Available>
        <p>Disponibile in Negozio</p>
      </Available>}
    </Wrapper>
  );
};

ProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map,
  handleClick: PropTypes.func
};

ProductBadge.defaultProps = {
  productInfo: Map(),
  handleClick: () => null
};

export default ProductBadge;
