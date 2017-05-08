import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MyPlaceIcon from 'material-ui/svg-icons/maps/person-pin-circle';

import StoreStockBadge from '../containers/StoreStockBadge';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  width: 100%;
  height: 1080px;
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

const WhiteBg = styled.div`
  position: absolute;
  height: 25px;
  width: 20px;
  z-index: -1;
  top: 9px;
  left: 16px;
  background-color: #fff;
`;

const Icon = styled.div`
  position: relative;
`;


const Marker = ({ })

export default class AvailabilityMap extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    nearbyStoreStock: ImmutablePropTypes.list.isRequired,
    currentStore: ImmutablePropTypes.map.isRequired
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
  renderMarkers() {
    const { nearbyStoreStock } = this.props;
    return nearbyStoreStock.map(s => {
      const currentStock = s.get('storeStock');
      const iconColor = currentStock > 0 ? '#67cb33' : '#000';
      const code = s.get('code');
      const lat = s.get('latitude');
      const lng = s.get('longitude');

      return (
        <Icon
          key={code}
          lat={lat}
          lng={lng}
        >
          <PlaceIcon
            style={{ height: 55, width: 55, cursor: 'pointer' }}
            color={iconColor}
            onTouchTap={() => this.selectStore(code)}
          />
          <WhiteBg />
        </Icon>
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
    const { productName, productCode, currentStore } = this.props;
    const lat = currentStore.getIn(['gpsInformation', 'x']);
    const lng = currentStore.getIn(['gpsInformation', 'y']);
    const code = currentStore.get('code');

    const center = { lat, lng };

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        {/* <StoreList>
          {this.renderNearbyStores()}
        </StoreList>
        <Divider />
        {this.renderSelectedStore()} */}
        <GoogleMapReact
          center={center}
          defaultZoom={11}
          fullscreenControl={false}
          options={{ fullscreenControl: false }}
        >
          <Icon lat={lat} lng={lng}>
            <MyPlaceIcon
              style={{ height: 55, width: 55, cursor: 'pointer' }}
              color="red"
              onTouchTap={() => this.selectStore(code)}
            />
            <WhiteBg />
          </Icon>
          {this.renderMarkers()}
        </GoogleMapReact>
      </Wrapper>
    );
  }
}
