import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';
import PrezzoGiuBadge from '../assets/product_badge/abbiamo_abbassato_prezzi.png';
import PromoWebBadge from '../assets/product_badge/PROMO_WEB-2.png';
import PrezzoVincenteBadge from '../assets/product_badge/PREZZO_VINCENTE-2.png';
import DestockBadge from '../assets/product_badge/DESTOCK-2.png';
import PrezzoStockBadge from '../assets/product_badge/PREZZO_STOCK-2.png';
import LoyaltyBadge from '../assets/product_badge/badge-doppio.png';

import Novita from './Novita';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

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

export default class MarketingFlag extends Component {
  static propTypes = {
    marketingAttributes: ImmutablePropTypes.map.isRequired,
    loyaltyProgram: ImmutablePropTypes.map.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      prezzoGiu: false,
      prezzoVincente: false,
      promoWeb: false,
      prezzoStock: false,
      destock: false,
      novita: false,
      loyalty: {
        active: false,
        discount: 0
      }
    };
  }

  componentDidMount() {
    this.calculateLoyalty();
    this.calculateMarketingBadges();
  }

  calculateMarketingBadges() {
    const { marketingAttributes } = this.props;
    const marketingAttributeList = marketingAttributes.getIn(['marketingAttributeList']);
    if (marketingAttributeList) {
      marketingAttributeList.map(ma => {
        if (ma.get('specialBadgeCode') === 'PREZZO_GIU') {
          return this.setState({ prezzoGiu: true });
        }
        if (ma.get('specialBadgeCode') === 'PROMO_WEB') {
          return this.setState({ promoWeb: true });
        }
        if (ma.get('specialBadgeCode') === 'PREZZO_VINCENTE') {
          return this.setState({ prezzoVincente: true });
        }
        if (ma.get('specialBadgeCode') === 'PREZZO_STOCK') {
          return this.setState({ prezzoStock: true });
        }
        if (ma.get('specialBadgeCode') === 'DESTOCK') {
          return this.setState({ destock: true });
        }
        return null;
      });
    }
    if (marketingAttributes.get('newOnMarketStartDate')) {
      this.setState({ novita: true });
    }
  }

  calculateLoyalty() {
    const { loyaltyProgram } = this.props;
    const discount = loyaltyProgram.get('type') === 'DISCOUNT';
    const value = loyaltyProgram.get('value');
    if (discount) {
      this.setState({
        loyalty: {
          active: true,
          discount: value
        }
      });
    }
  }

  RenderBadges() {
    let list = List();

    const {
      prezzoGiu,
      novita,
      destock,
      promoWeb,
      prezzoVincente,
      prezzoStock,
      loyalty: {
        active,
        discount
      }
    } = this.state;

    if (prezzoGiu) {
      list = list.push(
        <Badge
          height="100px"
          width="100px"
          src={PrezzoGiuBadge}
          key="prezzoGiu"
        />
      );
    } else if (novita) {
      list = list.push(<Novita key="novita" />);
    }
    if (promoWeb) {
      list = list.push(
        <Badge
          width="100px"
          src={PromoWebBadge}
          key="promoWeb"
        />
      );
    } else if (destock) {
      if (list.contains('novita')) {
        list.filterNot(f => f.key === 'novita');
      }
      list = list.push(
        <Badge
          src={DestockBadge}
          key="destock"
        />
      );
    } else if (prezzoVincente) {
      list = list.push(
        <Badge
          height="20px"
          width="120px"
          src={PrezzoVincenteBadge}
          key="prezzoVincente"
        />
      );
    } else if (prezzoStock) {
      list = list.push(
        <Badge
          height="20px"
          width="120px"
          src={PrezzoStockBadge}
          key="prezzoStock"
        />
      );
    } else if (active) {
      list = list.push(
        <div style={{ position: 'relative' }}>
          <Badge
            height="50px"
            width="100px"
            src={LoyaltyBadge}
            key="loyalty"
            mBottom="18px"
          />
          <Label>{`-${discount}% IDEAPIÚ`}</Label>
        </div>
      );
    }
    return list;
  }

  render() {
    return (
      <Wrapper>
        {this.RenderBadges()}
      </Wrapper>
    );
  }
}
