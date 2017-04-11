import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import StoreStockBadge from './StoreStockBadge';

const Wrapper = styled.div`
  width: 255px;
  display: flex;
  flex-direction: column;
  padding: 22px 10px 10px;
  background-color: #f7f7f7;
`;

const Price = styled.p`
  font-size: 36px;
  text-align: right;
  margin-bottom: 3px;
`;

const Quantity = styled.p`
  font-size: 14px;
  font-family: LeroyMerlinSans Light;
  text-align: right;
`;

const Divider = styled.div`
  border: 1px dashed #333333;
  width: 100%;
  margin: 15px 0;
`;

const Button = styled.div`
  width: '100%';
  text-transform: uppercase;
  background: ${props => props.bgColor};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  box-shadow:  0 0 8px 0 rgba(51, 51, 51, 0.1);
  cursor: pointer;
`;

const StoreStockWrapper = styled.div`
  margin-bottom: 20px;
`;

export default class PriceBadge extends Component {
  static propTypes = {
    pricingInfo: ImmutablePropTypes.map.isRequired,
    currentStoreStock: ImmutablePropTypes.map.isRequired
  }

  render() {
    const { pricingInfo, currentStoreStock } = this.props;
    const sellingPrice = pricingInfo.get('gross').toFixed(2);

    return (
      <Wrapper>
        <Price>{sellingPrice} &#8364;</Price>
        <Quantity>1 pz / pz</Quantity>
        <Divider />
        <StoreStockWrapper>
          <StoreStockBadge currentStoreStock={currentStoreStock} />
        </StoreStockWrapper>
        <Button bgColor="#67cb33">verifica disponibilità in negozi vicini</Button>
        <Divider />
        <Button bgColor="#339900">acquista online</Button>
      </Wrapper>
    );
  }

}
