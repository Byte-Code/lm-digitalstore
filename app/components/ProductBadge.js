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
  margin-bottom: 30px;
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

const ProductBadge = ({ productInfo, handleClick }) => {
  if (productInfo.isEmpty()) {
    return null;
  }
  const imageID = productInfo.get('mainImage');
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.get('name');
  const grossPrice = productInfo.getIn(['price', 'selling', 'gross']);
  const listPrice = productInfo.getIn(['price', 'selling', 'list']);
  const isBarred = listPrice && true;
  const discount = productInfo.getIn(['price', 'selling', 'discount']);
  const isInStock = (productInfo.get('storeStock') - 2) > 0;
  // const marketingAttributes = productInfo.get('marketingAttributes');

  return (
    <Wrapper onClick={handleClick}>
      <Image
        imageID={imageID}
        imageOptions={imageOptions}
        alt={name}
      />
      <Name>{name}</Name>
      <PriceWrapper>
        {discount && <Discount>{Math.ceil(discount)} &#37;</Discount>}
        <Price isBarred={isBarred}>{formatPrice(grossPrice)} &#8364;</Price>
        {listPrice && <Price discounted>{formatPrice(listPrice)} &#8364;</Price>}
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
