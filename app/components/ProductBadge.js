import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';

import Image from './Image';
import { formatPrice } from '../utils/utils';
import MarketingFlag from '../components/MarketingFlag';
import { getMarketingProps } from '../utils/marketingUtils';

const ProductBadge = ({ productInfo, handleClick, animated, animatedDirection }) => {
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

  const MarketingFlagStyle = {
    wrapperStyle: {
      position: 'absolute',
      justifyContent: 'space-between !important',
      padding: '0px !important'
    },
    topLeftStyle: {
      '&>img': {
        marginLeft: '-5px !important',
        marginTop: '-4px'
      }
    },
    topRightStyle: {
      '&>img': {
        marginRight: '12px !important'
      }
    }
  };

  const marketingPriceProps = getMarketingProps(productInfo);

  return (
    <Wrapper animated={animated} animatedDirection={animatedDirection} onClick={handleClick}>
      <MarketingFlag {...marketingPriceProps} {...MarketingFlagStyle} />
      <Image imageID={imageID} imageOptions={imageOptions} alt={name} />
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
  handleClick: PropTypes.func,
  animated: PropTypes.bool,
  animatedDirection: PropTypes.string
};

ProductBadge.defaultProps = {
  productInfo: Map(),
  handleClick: () => null,
  animated: false,
  animatedDirection: 'left'
};

export default ProductBadge;

/* eslint-disable */
const Wrapper = glamorous.div(({ animated, animatedDirection }) => ({
  animation: animatedDirection === 'left'
    ? animated ?  'mymove 0.5s' : 'mymove1 0.5s'
    : animated ?  'mymoveRight 0.8s' : 'mymoveRight1 0.8s',
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
}));
/* eslint-enable */

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
