import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Image from './Image';

const Wrapper = styled.div`
  height: 605px;
  width: 405px;
  color: #333333;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin: 10px 0;
`;

const Name = styled.div`
  line-height: 32px;
  font-size: 20px;
  text-align: center;
  font-family: LeroyMerlinSans Bold;
  margin: 10px 0;
  text-transform: uppercase;
`;

const ProductBadge = ({ productInfo }) => {
  const imageID = productInfo.get('mainImage');
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.get('name');
  const title = 'FACILE DA RIPORRE';

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Image
        imageID={imageID}
        imageOptions={imageOptions}
        alt={name}
      />
      <Name>{name}</Name>
    </Wrapper>
  );
};

ProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map.isRequired
};

export default ProductBadge;
