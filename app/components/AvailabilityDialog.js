import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

import StoreStockBadge from '../containers/StoreStockBadge';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  line-height: 70px;
`;

const ProductInfo = styled.h3`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 66px;
`;

const StoreList = styled.div`
  display: flex;
  flex-flow: row wrap;
  &>div {
    width: 50%;
  }
`;

export const StoreBadge = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  &>p {
    font-size: 16px;
    margin-bottom: 5px;
    &:first-child {
      font-family: LeroyMerlinSans Bold;
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }
  }
`;

const Divider = styled.div`
  border: 1px dashed #fff;
  width: 100%;
  margin: 30px 0 55px 0;
`;

const SelectedStore = styled.div`
  display: flex;
  justify-content: space-between;
  height: 96px;
  &>div {
    width: 385px;
  }
`;

const StoreName = styled.p`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Address = styled.div`
  &>p {
    font-size: 20px;
    color: #e4e4e4;
    font-family: LeroyMerlinSans Light;
  }
`;

export default class AvailabilityDialog extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    nearbyStoreStock: ImmutablePropTypes.list.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedStore: -1
    };
  }

  selectStore = (storeCode) => {
    this.setState({ selectedStore: storeCode });
  }

  // TODO move this logic into a separate component
  renderNearbyStores() {
    const { nearbyStoreStock } = this.props;
    const { selectedStore } = this.state;
    return nearbyStoreStock.map(s => {
      const currentStock = s.get('storeStock');
      const iconColor = currentStock > 0 ? '#67cb33' : 'e4e4e4';
      const code = s.get('code');
      const isActive = code === selectedStore;
      const province = s.getIn(['address', 'state']);
      const street = s.getIn(['address', 'street']);
      const streetNumber = s.getIn(['address', 'streetNumber']) || '';
      const zip = s.getIn(['address', 'zipCode']);
      const city = s.getIn(['address', 'city']);
      const name = s.get('name');

      return (
        <StoreBadge
          key={code}
          isActive={isActive}
          onClick={() => this.selectStore(code)}
        >
          <PlaceIcon style={{ height: 55, width: 55 }} color={iconColor} />
          <StoreInfo>
            <p>{`${province} - ${name}`}</p>
            <p>{`${street} ${streetNumber}`}</p>
            <p>{`${zip} - ${city} (${province})`}</p>
          </StoreInfo>
        </StoreBadge>
      );
    });
  }

  // TODO move this logic into a separate component
  renderSelectedStore() {
    const { nearbyStoreStock } = this.props;
    const { selectedStore } = this.state;
    if (selectedStore === -1) {
      return <SelectedStore />;
    }
    const currentStoreStockInfo = nearbyStoreStock.find(ns => ns.get('code') === selectedStore);
    const name = currentStoreStockInfo.get('name');
    const street = currentStoreStockInfo.getIn(['address', 'street']);
    const streetNumber = currentStoreStockInfo.getIn(['address', 'streetNumber']) || '';
    const zip = currentStoreStockInfo.getIn(['address', 'zipCode']);
    const city = currentStoreStockInfo.getIn(['address', 'city']);
    const province = currentStoreStockInfo.getIn(['address', 'state']);

    return (
      <SelectedStore>
        <div>
          <StoreName>{name}</StoreName>
          <Address>
            <p>{`${street} ${streetNumber}`}</p>
            <p>{`${zip} - ${city} (${province})`}</p>
          </Address>
        </div>
        <StoreStockBadge
          currentStoreStock={currentStoreStockInfo}
          showStore={false}
        />
      </SelectedStore>
    );
  }

  render() {
    const { productName, productCode } = this.props;

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        <StoreList>
          {this.renderNearbyStores()}
        </StoreList>
        <Divider />
        {this.renderSelectedStore()}
      </Wrapper>
    );
  }
}
