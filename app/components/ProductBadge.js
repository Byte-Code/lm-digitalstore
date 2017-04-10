import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

import Image from './Image';

const Wrapper = styled.div`
  height: 605px;
  width: 405px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const Price = styled.div`
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 83px;
`;

const ProductBadge = ({ productInfo, handleClick }) => {
  if (productInfo.isEmpty()) {
    return null;
  }
  const imageID = productInfo.get('mainImage');
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.get('name');
  const price = productInfo.getIn(['price', 'selling', 'gross']).toFixed(2);
  const currency = productInfo.getIn(['price', 'currency']);
  const displayPrice = `${price} ${currency}`;

  return (
    <Wrapper onClick={handleClick}>
      <Image
        imageID={imageID}
        imageOptions={imageOptions}
        alt={name}
      />
      <Name>{name}</Name>
      <Price>{displayPrice}</Price>
    </Wrapper>
  );
};

ProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map,
  handleClick: PropTypes.func
};

ProductBadge.defaultProps = {
  productInfo: Map(),
  handleClick: () => {}
};

export default ProductBadge;
