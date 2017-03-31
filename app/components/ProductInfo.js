import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';

import { chunkItemList } from '../utils/utils';
import ProductInfoCAB from './ProductInfoCAB';
import ProductInfoNOCAB from './ProductInfoNOCAB';

const ProductInfo = ({ productType, descriptions, marketingDescriptions }) => {
  if (productType === 'CAB') {
    const halfDescriptionsSize = Math.ceil(descriptions.size / 2);
    const chunkedDescriptions = chunkItemList(descriptions, halfDescriptionsSize);
    return (
      <ProductInfoCAB
        marketingDescriptions={marketingDescriptions}
        descriptions={chunkedDescriptions}
      />
    );
  }
  return <ProductInfoNOCAB descriptions={descriptions} />;
};

ProductInfo.propTypes = {
  productType: PropTypes.string.isRequired,
  descriptions: ImmutablePropTypes.list.isRequired,
  marketingDescriptions: ImmutablePropTypes.map
};

ProductInfo.defaultProps = {
  marketingDescriptions: Map()
};

export default ProductInfo;
