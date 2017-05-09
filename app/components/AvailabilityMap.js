import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MyPlaceIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import BlockIcon from 'material-ui/svg-icons/navigation/close';
import Slider from 'material-ui/Slider';

import { getStockLabel } from '../utils/utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Map = styled.div`
  width: 100%;
  height: 1080px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  line-height: 70px;
`;

const ProductInfo = styled.h3`
  font-size: 14px;
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

const InfoWindow = styled.div`
  width: 300px;
  background-color: #fff;
  box-shadow: 0 0 8px 0 #e4e4e4;
  position: absolute;
  top: -195px;
  left: 0;
  padding: 20px;
  z-index: 1;
`;

const Divider = styled.div`
  border: 1px dashed #333333;
  width: 100%;
`;

const Stock = styled.div`
  margin-top: 15px;
  color: ${props => (props.isAvailable ? '#67cb33' : '#333333')}
  font-size: 14px;
  font-family: LeroyMerlinSans Bold;
`;

const StoreName = styled.p`
  font-size: 20px;
  color: #262626;
  margin-bottom: 10px;
  font-family: LeroyMerlinSans Bold;
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 14px solid #fff;
  position: absolute;
  bottom: -14px;
  left: 14px;
  filter: drop-shadow(0 2px 0 #e4e4e4);
`;

const Address = styled.div`
  margin-bottom: 20px;
  &>p {
    font-size: 15px;
    color: #333333;
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
  z-index: 1;
`;

const Circle = styled.div`
  box-sizing: content-box;
  border: 5px dotted #67cb33;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
`;

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
      selectedStore: null,
      infoWindowOpen: false,
      zoom: 11
    };
  }

  selectStore = (storeCode) => {
    this.setState({ selectedStore: storeCode, infoWindowOpen: true });
  }

  closeInfoWindow = () => {
    this.setState({ infoWindowOpen: false });
  }

  updateZoom = (e) => {
    this.setState({ zoom: e.zoom });
  }

  renderMarkers() {
    const { nearbyStoreStock, currentStore } = this.props;
    return nearbyStoreStock
    .map(s => {
      const currentStock = s.get('storeStock');
      const code = s.get('code');
      const lat = s.get('latitude');
      const lng = s.get('longitude');
      const isCurrentStore = currentStore.get('code') === code;
      const MarkerIcon = isCurrentStore ? MyPlaceIcon : PlaceIcon;
      const iconColor = currentStock > 0 ? '#67cb33' : '#000';

      return (
        <Icon
          key={code}
          lat={lat}
          lng={lng}
        >
          <MarkerIcon
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
  renderInfoWindow() {
    const { nearbyStoreStock } = this.props;
    const { selectedStore, infoWindowOpen } = this.state;
    if (!infoWindowOpen || !selectedStore) {
      return null;
    }
    const currentStoreStockInfo = nearbyStoreStock.find(ns => ns.get('code') === selectedStore);
    const name = currentStoreStockInfo.get('name');
    const availability = currentStoreStockInfo.get('storeStock');
    const isAvailable = availability > 0;
    const label = getStockLabel(availability);
    const street = currentStoreStockInfo.getIn(['address', 'street']);
    const streetNumber = currentStoreStockInfo.getIn(['address', 'streetNumber']) || '';
    const zip = currentStoreStockInfo.getIn(['address', 'zipCode']);
    const city = currentStoreStockInfo.getIn(['address', 'city']);
    const province = currentStoreStockInfo.getIn(['address', 'state']);
    const lat = currentStoreStockInfo.get('latitude');
    const lng = currentStoreStockInfo.get('longitude');

    return (
      <InfoWindow lat={lat} lng={lng}>
        <BlockIcon
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: 5,
            right: 5,
            cursor: 'pointer'
          }}
          fill="#333333"
          onTouchTap={this.closeInfoWindow}
        />
        <div>
          <StoreName>{name}</StoreName>
          <Address>
            <p>{`${street} ${streetNumber}`}</p>
            <p>{`${city} - (${province})`}</p>
            <p>{zip}</p>
          </Address>
        </div>
        <Divider />
        <Stock isAvailable={isAvailable}>
          {label}
        </Stock>
        <ArrowDown />
      </InfoWindow>
    );
  }

  render() {
    const { productName, productCode, currentStore } = this.props;
    const { zoom } = this.state;
    const lat = currentStore.getIn(['gpsInformation', 'x']);
    const lng = currentStore.getIn(['gpsInformation', 'y']);
    const center = { lat, lng };
    const { w, h } = meters2ScreenPixels(80000, { lat, lng }, zoom);

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        <Map>
          <GoogleMapReact
            center={center}
            defaultZoom={11}
            fullscreenControl={false}
            options={{ fullscreenControl: false }}
            onChange={this.updateZoom}
          >
            {this.renderMarkers()}
            {this.renderInfoWindow()}
            <Circle lat={lat} lng={lng} style={{ width: parseInt(h, 10), height: parseInt(w, 10) }} />
          </GoogleMapReact>
        </Map>
      </Wrapper>
    );
  }
}
