import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';

import Image from './Image';
import { formatPrice, getProductAvailability } from '../utils/utils';
import MarketingFlag from '../components/MarketingFlag';
import { getMarketingProps } from '../utils/marketingUtils';

const ProductBadge = ({ productInfo, handleClick, animated, animatedDirection, stock }) => {
  if (productInfo.isEmpty()) {
    return null;
  }

  const imageID = productInfo.getIn(['basicInfo', 'data', 'mainImage']);
  const imageOptions = { width: 405, height: 405 };
  const name = productInfo.getIn(['basicInfo', 'data', 'name']);
  const grossPrice = productInfo.getIn(['price', 'data', 'selling', 'gross']);
  const listPrice = productInfo.getIn(['price', 'data', 'selling', 'list']);
  const isDiscounted = listPrice && listPrice - grossPrice > 1;
  const discount = productInfo.getIn(['price', 'data', 'selling', 'discount']);

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
      <Available>
        <p>{getProductAvailability(productInfo, stock)}</p>
      </Available>
    </Wrapper>
  );
};

ProductBadge.propTypes = {
  productInfo: ImmutablePropTypes.map,
  handleClick: PropTypes.func,
  animated: PropTypes.bool,
  animatedDirection: PropTypes.string,
  stock: PropTypes.number
};

ProductBadge.defaultProps = {
  productInfo: Map(),
  handleClick: () => null,
  animated: false,
  animatedDirection: 'left',
  stock: 0
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
  width: '100%',
  justifyContent: 'center',
  marginTop: '5%',
  '&>div:nth-child(3)': {
    marginLeft: 20
  }
});

const Price = glamorous.p(({ discounted, isBarred }) => ({
  fontSize: 20,
  lineHeight: '24px',
  color: discounted ? '#cc0000' : '#000',
  textDecoration: isBarred ? 'line-through' : 'none',
  marginLeft: '3%'
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
