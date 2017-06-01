import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Slider from 'material-ui/Slider';
import glamorous from 'glamorous';

import Marker from './Marker';
import InfoWindow from './InfoWindow';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  color: '#fff'
});

const Map = glamorous.div({
  width: '100%',
  height: '1080px',
  position: 'relative'
});

const Title = glamorous.h1({
  fontSize: '48px',
  textAlign: 'center',
  lineHeight: '70px'
});

const SliderTitle = glamorous.p({
  fontSize: '16px',
  color: '#e4e4e4',
  fontFamily: 'LeroyMerlinSans Italic'
});

const ProductInfo = glamorous.h3({
  fontSize: '14px',
  textAlign: 'center',
  textTransform: 'capitalize',
  marginBottom: '66px'
});

const Circle = glamorous.div(({ height, width }) => ({
  boxSizing: 'content-box',
  border: '5px dotted #67cb33',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  boxShadow: '0 0 0 9999999px rgba(0, 0, 0, 0.3)',
  pointerEvents: 'none',
  height,
  width
}));

const Radius = glamorous.div({
  fontSize: '16px',
  color: '#67cb33',
  margin: '0 auto 24px',
  textAlign: 'center',
  fontFamily: 'LeroyMerlinSans Light-Italic'
});

const sliderStyle = { marginBottom: 24 };
const mapOptions = { fullscreenControl: false, maxZoom: 17, minZoom: 8, zoomControl: false };

export default class AvailabilityMap extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    nearbyStoreStock: ImmutablePropTypes.list.isRequired,
    currentStore: ImmutablePropTypes.map.isRequired,
    requestFetchNearbyStores: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStore: null,
      infoWindowOpen: false,
      zoom: 11,
      range: 30
    };
  }

  componentDidMount() {
    this.updateMarkers();
  }

  onChangeSlider = (e, value) => {
    this.setState({ range: value }, () => {
      this.updateMarkers();
    });
  };

  updateMarkers() {
    const { currentStore, requestFetchNearbyStores } = this.props;
    const { range } = this.state;
    const lat = currentStore.getIn(['gpsInformation', 'x']);
    const lng = currentStore.getIn(['gpsInformation', 'y']);
    requestFetchNearbyStores(lat, lng, range);
    this.closeInfoWindow();
  }

  closeInfoWindow = () => {
    this.setState({ infoWindowOpen: false });
  };

  updateZoom = e => {
    this.setState({ zoom: e.zoom });
  };

  selectStore = storeCode => {
    this.setState({ selectedStore: storeCode, infoWindowOpen: true });
  };

  renderMarkers() {
    const { nearbyStoreStock, currentStore } = this.props;
    return nearbyStoreStock.map(s => {
      const isAvailable = s.get('storeStock') > 0;
      const code = s.get('code');
      const lat = s.get('latitude');
      const lng = s.get('longitude');
      const isCurrentStore = currentStore.get('code') === code;

      return (
        <Marker
          lat={lat}
          lng={lng}
          key={code}
          code={code}
          isCurrentStore={isCurrentStore}
          handleClick={() => this.selectStore(code)}
          isAvailable={isAvailable}
        />
      );
    });
  }

  renderInfoWindow() {
    const { nearbyStoreStock } = this.props;
    const { selectedStore, infoWindowOpen } = this.state;

    if (!infoWindowOpen || !selectedStore) {
      return null;
    }

    const currentStoreInfo = nearbyStoreStock.find(ns => ns.get('code') === selectedStore);
    const lat = currentStoreInfo.get('latitude');
    const lng = currentStoreInfo.get('longitude');

    return (
      <InfoWindow
        lat={lat}
        lng={lng}
        handleClick={this.closeInfoWindow}
        currentStoreInfo={currentStoreInfo}
      />
    );
  }

  render() {
    const { productName, productCode, currentStore } = this.props;
    const { zoom, range } = this.state;
    const currentStoreName = currentStore.get('name');
    const lat = currentStore.getIn(['gpsInformation', 'x']);
    const lng = currentStore.getIn(['gpsInformation', 'y']);
    const center = { lat, lng };
    const diameter = range * 1000 * 2;
    const { w, h } = meters2ScreenPixels(diameter, { lat, lng }, zoom);

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        <SliderTitle >{`Seleziona il raggio di distanza dal negozio di ${currentStoreName}`}</SliderTitle>
        <Slider
          min={10}
          max={50}
          step={10}
          value={range}
          onChange={this.onChangeSlider}
          color="#67cb33"
          sliderStyle={sliderStyle}
        />
        <Radius>{`${range} km`}</Radius>
        <Map>
          <GoogleMapReact
            center={center}
            defaultZoom={11}
            fullscreenControl={false}
            options={mapOptions}
            onChange={this.updateZoom}
          >
            {this.renderMarkers()}
            {this.renderInfoWindow()}
            <Circle lat={lat} lng={lng} width={w} height={h} />
          </GoogleMapReact>
        </Map>
      </Wrapper>
    );
  }
}
