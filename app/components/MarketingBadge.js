import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Novita from './Novita';

import PrezzoGiuBadge from '../assets/product_badge/abbiamo_abbassato_prezzi.png';
import PromoWebBadge from '../assets/product_badge/PROMO_WEB-2.png';
import PrezzoVincenteBadge from '../assets/product_badge/PREZZO_VINCENTE-2.png';
import DestockBadge from '../assets/product_badge/DESTOCK-2.png';
import PrezzoStockBadge from '../assets/product_badge/PREZZO_STOCK-2.png';
import IdeaPiuBadge from '../assets/product_badge/badge-doppio.png';

const Badge = styled.img`
  width: ${props => (props.width ? props.width : 'auto')};
  height: ${props => (props.height ? props.height : 'auto')};
  position: relative;
  margin-bottom: ${props => props.mBottom || 0}
`;

const Label = styled.p`
  position: absolute;
  bottom: 2px;
  height: 20px;
  width: 100px;
  font-size: 14px;
  background-color: #cc0000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
`;

export const PrezzoGiu = ({ src }) => (
  <Badge
    height="100px"
    width="100px"
    src={src}
  />
);

export const PromoWeb = ({ src }) => (
  <Badge
    width="100px"
    src={src}
  />
);

export const Destock = ({ src }) => (
  <Badge
    src={src}
  />
);

export const PrezzoVincente = ({ src }) => (
  <Badge
    height="20px"
    width="120px"
    src={src}
  />
);

export const PrezzoStock = ({ src }) => (
  <Badge
    height="20px"
    width="120px"
    src={src}
  />
);

export const IdeaPiu = ({ src, value }) => (
  <div style={{ position: 'relative' }}>
    <Badge
      height="50px"
      width="100px"
      src={src}
      mBottom="18px"
    />
    <Label>{`-${value}% IDEAPIÚ`}</Label>
  </div>
);

const MarketingBadge = ({ promotion }) => {
  switch (promotion.get('code')) {
    case 'PREZZO_GIU':
      return (
        <PrezzoGiu src={PrezzoGiuBadge} />
      );
    case 'NOVITA':
      return (
        <Novita />
      );
    case 'PROMO_WEB':
      return (
        <PromoWeb src={PromoWebBadge} />
      );
    case 'DESTOCK':
      return (
        <Destock src={DestockBadge} />
      );
    case 'PREZZO_STOCK':
      return (
        <PrezzoStock src={PrezzoStockBadge} />
      );
    case 'PREZZO_VINCENTE':
      return (
        <Badge src={PrezzoVincenteBadge} />
      );
    case 'IDEAPIU':
      return (
        <IdeaPiu src={IdeaPiuBadge} value={promotion.get('value')} />
      );
    default:
      return null;
  }
};

MarketingBadge.propTypes = {
  promotion: ImmutablePropTypes.map.isRequired
};

export default MarketingBadge;
