import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
// import { meters2ScreenPixels } from 'google-map-react/utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Slider from 'material-ui/Slider';
import { List, Map } from 'immutable';
import glamorous, { Div } from 'glamorous';

import Marker from './Marker';
import InfoWindow from './InfoWindow';
import NearbyStores from './NearbyStores';

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
    infoWindowOpen: PropTypes.bool.isRequired,
    trackStoreAvailabilityEvent: PropTypes.func.isRequired,
    stocks: ImmutablePropTypes.map
  };

  static defaultProps = {
    allNearbyStores: List(),
    selectedStoreInfo: Map(),
    stocks: Map()
  };

  constructor(props) {
    super(props);
    this.updateNearByList = false;
    this.state = {
      minRadius: 2,
      maxRadius: 50,
      sliderWidth: 960
    };
    this.nearByClick = this.nearByClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectedStoreInfo.equals(this.props.selectedStoreInfo)) {
      const storeName = nextProps.selectedStoreInfo.get('name');
      const storeCode = nextProps.selectedStoreInfo.get('code');
      const productCode = this.props.productCode;
      const storeStock = this.props.stocks.getIn([storeCode, productCode]);
      this.props.trackStoreAvailabilityEvent({ storeName, storeStock });
    }
  }

  getLabelPosition = radius => {
    const { sliderWidth, maxRadius, minRadius } = this.state;
    return (radius - minRadius) * sliderWidth / (maxRadius - minRadius); // eslint-disable-line
  };

  nearByClick(event) {
    this.props.selectStore(event);
    this.updateNearByList = true;
  }

  renderMarkers() {
    const { allNearbyStores, homeStore, selectStore, closeInfoWindow,
      stocks, productCode } = this.props;
    return allNearbyStores.map(s => {
      const code = s.get('code');
      const lat = s.get('latitude');
      const isAvailable = stocks.getIn([code, productCode]) > 0;
      const lng = s.get('longitude');
      const isCurrentStore = homeStore.get('code') === code;

      return (
        <Marker
          lat={lat}
          lng={lng}
          key={code}
          code={code}
          isCurrentStore={isCurrentStore}
          handleClick={() => {
            selectStore(code);
            closeInfoWindow();
            this.updateNearByList = false;
          }}
          isAvailable={isAvailable}
        />
      );
    });
  }

  renderInfoWindow() {
    const { selectedStoreInfo, selectedStore, infoWindowOpen,
      closeInfoWindow, stocks, productCode } = this.props;

    if (!infoWindowOpen || !selectedStore) {
      return null;
    }

    const lat = selectedStoreInfo.get('latitude');
    const lng = selectedStoreInfo.get('longitude');
    const stockValue = stocks.getIn([selectedStoreInfo.get('code'), productCode]);

    return (
      <InfoWindow
        lat={lat}
        lng={lng}
        handleClick={closeInfoWindow}
        selectedStoreInfo={selectedStoreInfo}
        storesStock={stockValue}
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
      handleChange,
      handleSlide,
      } = this.props;
    const { minRadius, maxRadius } = this.state;
    const homeStoreName = homeStore.get('name');
    const lat = homeStore.getIn(['gpsInformation', 'x']);
    const lng = homeStore.getIn(['gpsInformation', 'y']);
    const center = { lat, lng };
    const labelPosition = this.getLabelPosition(radius);

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
            step={10}
          />
          <Radius left={labelPosition}>{`${radius} km`}</Radius>
        </Div>
        <MapWrapper id="map">
          <GoogleMapReact
            center={center}
            fullscreenControl={false}
            options={mapOptions}
            onChange={handleChange}
            zoom={zoom}
          >
            {this.renderMarkers()}
            {this.renderInfoWindow()}
            <Circle lat={lat} lng={lng} width={930} height={930} />
          </GoogleMapReact>
          <ControlsOverlay />
        </MapWrapper>
        <NearbyStores
          nearbyStores={nearbyStoresWithProductInStock}
          selectedStore={selectedStore}
          handleClick={this.nearByClick}
          updateNearByList={this.updateNearByList}
        />
      </Wrapper>
    );
  }
}

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
const mapOptions = {
  gestureHandling: 'none',
  fullscreenControl: false,
  maxZoom: 17,
  minZoom: 8,
  zoomControl: false
};
