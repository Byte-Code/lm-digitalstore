import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Image from './Image';

const ProductBadge = ({ productInfo }) => {
  const imageID = productInfo.get('mainImage');
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.get('name');

  return (
    <Image
      imageID={imageID}
      imageOptions={imageOptions}
      alt={name}
    />
  );
};

ProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map.isRequired
};

export default ProductBadge;
