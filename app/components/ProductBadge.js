import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';

import Image from './Image';
import { formatPrice } from '../utils/utils';
import { isNewOnMarket } from '../utils/marketingUtils';

const Wrapper = glamorous.div({
  height: 593,
  width: 405,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  position: 'relative',
  cursor: 'pointer',
  fontSize: 0,
  '&>div': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 33px'
  },
  '&>img': {
    height: 405,
    width: 405
  }
});

const Name = glamorous.div({
  lineHeight: '32px',
  fontSize: 20,
  fontFamily: 'LeroyMerlinSans Bold',
  textTransform: 'uppercase',
  textAlign: 'center',
  margin: '10px 0'
});

const PriceWrapper = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 'auto',
  marginBottom: 20,
  width: '100%',
  justifyContent: 'center',
  '&>p': {
    marginBottom: 10
  },
  '&>div:nth-child(3)': {
    marginLeft: 20
  }
});

const Price = glamorous.div(({ discounted, isBarred }) => ({
  fontSize: 20,
  lineHeight: '24px',
  color: discounted ? '#cc0000' : '#000',
  textDecoration: isBarred ? 'line-through' : 'none'
}));

export const Discount = glamorous.p({
  fontSize: 20,
  color: '#cc0000',
  textAlign: 'center',
  width: '100%'
});

export const Available = glamorous.div({
  color: '#339900',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  height: 40,
  bottom: 188,
  '&>p': {
    fontFamily: 'LeroyMerlinSans Bold',
    fontSize: 16
  },
  background: 'rgba(255, 255, 255, 0.8)'
});

const Corner = glamorous.section(({ bgColor, fSize }) => ({
  height: 42,
  width: 42,
  background: bgColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: fSize,
  color: '#fff',
  textAlign: 'center',
  fontFamily: 'LeroyMerlinSans Bold',
  position: 'absolute',
  top: 0,
  right: 0
}));

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
  const isDiscounted = listPrice && true && listPrice - grossPrice > 1;
  const discount = productInfo.getIn(['price', 'selling', 'discount']);
  const isInStock = productInfo.get('storeStock') > 0;
  const isNew = isNewOnMarket(productInfo.get('marketingAttributes'));

  return (
    <Wrapper onClick={handleClick}>
      <Image imageID={imageID} imageOptions={imageOptions} alt={name} />
      <MarketingCorner isDiscounted={isDiscounted} isNew={isNew} />
      <Name>{name}</Name>
      <PriceWrapper>
        {isDiscounted && <Discount>-{Math.round(discount)} %</Discount>}
        <Price isBarred={isDiscounted}>
          {formatPrice(listPrice) || formatPrice(grossPrice)} €
        </Price>
        {listPrice && <Price discounted>{formatPrice(grossPrice)} €</Price>}
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
