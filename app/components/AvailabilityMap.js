import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Slider from 'material-ui/Slider';
import { List, Map } from 'immutable';
import glamorous, { Div } from 'glamorous';

import Marker from './Marker';
import InfoWindow from './InfoWindow';
import NearbyStores from './NearbyStores';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  color: '#fff'
});

const MapWrapper = glamorous.div({
  width: '100%',
  height: '930px',
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

const Radius = glamorous.div(({ left }) => ({
  fontSize: '16px',
  color: '#67cb33',
  margin: '0 auto 24px',
  textAlign: 'center',
  fontFamily: 'LeroyMerlinSans Light-Italic',
  position: 'absolute',
  left,
  top: 75
}));

const ControlsOverlay = glamorous.div({
  height: 30,
  position: 'absolute',
  bottom: 0,
  width: '100%'
});

const sliderStyle = { marginBottom: 24 };
const mapOptions = { fullscreenControl: false, maxZoom: 17, minZoom: 8, zoomControl: false };

export default class AvailabilityMap extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    selectedStore: PropTypes.string.isRequired,
    allNearbyStores: ImmutablePropTypes.list,
    homeStore: ImmutablePropTypes.map.isRequired,
    selectedStoreInfo: ImmutablePropTypes.map,
    nearbyStoresWithProductInStock: ImmutablePropTypes.list.isRequired,
    selectStore: PropTypes.func.isRequired,
    closeInfoWindow: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSlide: PropTypes.func.isRequired,
    radius: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    infoWindowOpen: PropTypes.bool.isRequired
  };

  static defaultProps = {
    allNearbyStores: List(),
    selectedStoreInfo: Map()
  };

  constructor(props) {
    super(props);
    this.state = {
      initialZoom: 11,
      minRadius: 2,
      maxRadius: 50,
      sliderWidth: 960
    };
  }

  getLabelPosition = radius => {
    const { sliderWidth, maxRadius, minRadius } = this.state;
    return (radius - minRadius) * sliderWidth / (maxRadius - minRadius); // eslint-disable-line
  };

  renderMarkers() {
    const { allNearbyStores, homeStore, selectStore } = this.props;
    return allNearbyStores.map(s => {
      const isAvailable = s.get('storeStock') > 0;
      const code = s.get('code');
      const lat = s.get('latitude');
      const lng = s.get('longitude');
      const isCurrentStore = homeStore.get('code') === code;

      return (
        <Marker
          lat={lat}
          lng={lng}
          key={code}
          code={code}
          isCurrentStore={isCurrentStore}
          handleClick={() => selectStore(code)}
          isAvailable={isAvailable}
        />
      );
    });
  }

  renderInfoWindow() {
    const { selectedStoreInfo, selectedStore, infoWindowOpen, closeInfoWindow } = this.props;

    if (!infoWindowOpen || !selectedStore) {
      return null;
    }

    const lat = selectedStoreInfo.get('latitude');
    const lng = selectedStoreInfo.get('longitude');

    return (
      <InfoWindow
        lat={lat}
        lng={lng}
        handleClick={closeInfoWindow}
        selectedStoreInfo={selectedStoreInfo}
      />
    );
  }

  render() {
    const {
      productName,
      productCode,
      homeStore,
      nearbyStoresWithProductInStock,
      radius,
      zoom,
      selectedStore,
      selectStore,
      handleChange,
      handleSlide
    } = this.props;
    const { minRadius, maxRadius, initialZoom } = this.state;
    const homeStoreName = homeStore.get('name');
    const lat = homeStore.getIn(['gpsInformation', 'x']);
    const lng = homeStore.getIn(['gpsInformation', 'y']);
    const center = { lat, lng };
    const diameter = radius * 1000 * 2;
    const labelPosition = this.getLabelPosition(radius);
    const { w, h } = meters2ScreenPixels(diameter, { lat, lng }, zoom);

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        <Div padding="0 20px 40px" position="relative">
          <SliderTitle >{`Seleziona il raggio di distanza dal negozio di ${homeStoreName}`}</SliderTitle>
          <Slider
            min={minRadius}
            max={maxRadius}
            value={radius}
            onChange={handleSlide}
            color="#67cb33"
            sliderStyle={sliderStyle}
          />
          <Radius left={labelPosition}>{`${radius} km`}</Radius>
        </Div>
        <MapWrapper>
          <GoogleMapReact
            center={center}
            defaultZoom={initialZoom}
            fullscreenControl={false}
            options={mapOptions}
            onChange={handleChange}
          >
            {this.renderMarkers()}
            {this.renderInfoWindow()}
            <Circle lat={lat} lng={lng} width={w} height={h} />
          </GoogleMapReact>
          <ControlsOverlay />
        </MapWrapper>
        <NearbyStores
          nearbyStores={nearbyStoresWithProductInStock}
          selectedStore={selectedStore}
          handleClick={selectStore}
        />
      </Wrapper>
    );
  }
}
