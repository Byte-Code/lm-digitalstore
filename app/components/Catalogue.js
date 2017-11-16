/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import Swipeable from 'react-swipeable';
import chunk from 'lodash/chunk';
import { Link } from 'react-router';
import { List, fromJS, Map } from 'immutable';
import { getCategoryName } from '../utils/utils';
import { getPreviousPath } from '../utils/RouterChangeListener';

import ProductBadge from './ProductBadge';
import FilterBar from './FilterBar';

import Quagga from 'quagga';

export default class Catalogue extends Component {
  static propTypes = {
    categoryCode: PropTypes.string.isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    saveGalleryIndex: PropTypes.func.isRequired,
    clearProductList: PropTypes.func.isRequired,
    trackCatalogueProductsChunk: PropTypes.func.isRequired,
    products: ImmutablePropTypes.list,
    isDialogOpen: PropTypes.bool.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired,
    catalogueStocks: ImmutablePropTypes.map,
    chunkIndex: PropTypes.number.isRequired,
    applyFilterInDataLayer: PropTypes.func.isRequired,
    initFilters: PropTypes.func.isRequired,
    deleteFilters: PropTypes.func.isRequired,
    setAnalyticsProductClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    products: List(),
    catalogueStocks: Map()
  };

  constructor(props) {
    super(props);
    this.flagOnSwipe = false;
    this.chunkSize = 4;
    this.productsChunk = List();
    this.timeout = 1000;
    this.renderProducts = this.renderProducts.bind(this);
    this.onBadgeClick = this.onBadgeClick.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.chunkerizeProductList = this.chunkerizeProductList.bind(this);
    this.getChunks = this.getChunks.bind(this);
    this.trackCurrentChunk = this.trackCurrentChunk.bind(this);
    this.updateCurrentChunkInState = this.updateCurrentChunkInState.bind(this);
    this.setChunkPosition = this.setChunkPosition.bind(this);
    this.checkCategoryChange = this.checkCategoryChange.bind(this);
    this.checkAnalyticsConditionAndTrack = this.checkAnalyticsConditionAndTrack.bind(this);
    this.filtersHaveChanged = this.filtersHaveChanged.bind(this);
    this.trackChunk = this.trackChunk.bind(this);
    this.initializeCurrentChunk = this.initializeCurrentChunk.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    const { requestFetchCategory, categoryCode } = this.props;
    requestFetchCategory(categoryCode);


    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#pippo'),
        constraints: {
          width: 480,
          height: 320,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      }

    }, function (err) {
      if (err) {
        console.log(err);
        return;
      }

      Quagga.start();

      // Set flag to is running
    });

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });


    Quagga.onDetected(function (result) {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    });


  }

  componentWillReceiveProps(nextProps) {
    const categoryHasChanged = nextProps.categoryCode !== this.props.categoryCode;

    if (nextProps.products.size > 0) {
      const landingFromProductPage = getPreviousPath().startsWith('/product');
      this.chunkerizeProductList(nextProps.products);

      if (!this.state.currentChunk) {
        const { applyFilterInDataLayer, initFilters, chunkIndex } = this.props;

        if (landingFromProductPage) {
          applyFilterInDataLayer();
        } else {
          initFilters();
        }

        if (chunkIndex > 0 && landingFromProductPage) {
          this.setChunkPosition(chunkIndex, chunkIndex + 1);
          this.updateCurrentChunkInState();
          this.trackChunk(chunkIndex);
        } else {
          this.updateCurrentChunkInState();
          this.trackCurrentChunk();
        }
      }
    }

    if (categoryHasChanged) {
      this.initializeCurrentChunk();
    }

    if (this.filtersHaveChanged(nextProps)) {
      this.setChunkPosition(0, 1);
      this.updateCurrentChunkInState();
    }
  }

  componentDidUpdate(nextProps, nextState) {
    this.checkCategoryChange({ nextProps, nextState });
    this.checkAnalyticsConditionAndTrack({ nextProps, nextState });
  }

  componentWillUnmount() {
    this.props.clearProductList();
    this.props.saveGalleryIndex(this.state.currentChunkIndex);
  }

  onBadgeClick(product, index) {
    const position = (this.state.currentChunkIndex * this.chunkSize) + index;
    this.props.setAnalyticsProductClick({ product, index: position });
  }

  onLeftSwipe() {
    let { currentChunkIndex, appendChunkIndex } = this.state;
    if (appendChunkIndex <= this.productsChunk.size - 1 && !this.flagOnSwipe) {
      this.flagOnSwipe = true;
      this.setChunkPosition(currentChunkIndex += 1, appendChunkIndex += 1, 'left');
      setTimeout(() => this.flagOnSwipe = false, this.timeout); //eslint-disable-line
    }
  }

  onRightSwipe() {
    let { currentChunkIndex, appendChunkIndex } = this.state;
    if (currentChunkIndex > 0 && !this.flagOnSwipe) {
      this.flagOnSwipe = true;
      this.setChunkPosition(currentChunkIndex -= 1, appendChunkIndex -= 1, 'right');
      setTimeout(() => this.flagOnSwipe = false, this.timeout); //eslint-disable-line
    }
  }

  setChunkPosition(currentChunkIndex, appendChunkIndex, swipe = this.state.swipe) {
    this.setState({ currentChunkIndex, appendChunkIndex, swipe });
  }

  getChunks() {
    let chunks = List();

    if (this.productsChunk.size > 0) {
      const { currentChunkIndex, appendChunkIndex } = this.state;
      const currChunkIsPresent = this.productsChunk.has(currentChunkIndex);
      let currentChunk = null;
      let appendChunk = null;

      if (currChunkIsPresent) {
        currentChunk = this.productsChunk.getIn([currentChunkIndex]);
        appendChunk = this.productsChunk.getIn([appendChunkIndex]);
      } else {
        this.setChunkPosition(0, 1);
      }

      chunks = appendChunk ? currentChunk.concat(appendChunk) : currentChunk;
    }
    return chunks ? chunks : List(); // eslint-disable-line
  }

  getCurrentChunk() {
    const currentChunksSize = this.getChunks().size;
    return currentChunksSize > this.chunkSize
      ? this.getChunks().setSize(this.chunkSize)
      : this.getChunks().setSize(currentChunksSize);
  }

  initializeCurrentChunk() {
    this.setState({ currentChunk: null });
  }

  filtersHaveChanged(nextProps) {
    return !(nextProps.filterMap.get('filters').equals(this.props.filterMap.get('filters')))
    || !(nextProps.filterMap.get('availability') === this.props.filterMap.get('availability'))
    || !(nextProps.filterMap.get('aid') === this.props.filterMap.get('aid'));
  }

  checkAnalyticsConditionAndTrack({ nextProps, nextState }) {
    const filtersHaveChanged = this.filtersHaveChanged(nextProps);
    const currentChunkChanged = nextState.currentChunkIndex !== this.state.currentChunkIndex;
    const notCategoryChange = nextProps.categoryCode === nextProps.filterMap.get('categoryCode');
    const swipe = Math.abs(nextState.currentChunkIndex - this.state.currentChunkIndex) === 1;

    if (filtersHaveChanged && notCategoryChange) {
      this.trackChunk();
    }

    if (currentChunkChanged && swipe && !filtersHaveChanged) {
      this.updateCurrentChunkInState();
      this.trackCurrentChunk();
    }
  }

  checkCategoryChange({ nextProps }) {
    if (nextProps.categoryCode !== this.props.categoryCode) {
      this.props.requestFetchCategory(this.props.categoryCode);
      this.props.initFilters();
      this.props.deleteFilters();
    }
  }

  updateCurrentChunkInState() {
    this.setState({ currentChunk: this.getCurrentChunk() });
  }

  chunkerizeProductList(productList) {
    this.productsChunk = fromJS(chunk(productList.toJS(), this.chunkSize));
  }

  trackCurrentChunk() {
    const positionIndex = this.chunkSize * this.state.currentChunkIndex;

    this.props.trackCatalogueProductsChunk({
      products: this.getCurrentChunk(),
      positionIndex
    });
  }

  trackChunk(index = 0) {
    const positionIndex = this.chunkSize * index;

    this.props.trackCatalogueProductsChunk({
      products: this.productsChunk.get(index),
      positionIndex
    });
  }

  renderProducts(products) {
    return products.map((p, index) =>
      <Link
        onClick={() => this.onBadgeClick(p, index)}
        to={`product/${p.get('code')}`} key={p.get('code')}
      >
        <ProductBadge
          productInfo={p}
          animated={index < 4}
          animatedDirection={this.state.swipe}
          stock={this.props.catalogueStocks.get(p.get('code'))}
        />
      </Link>
    );
  }

  render() {
    const { products, categoryCode, isDialogOpen } = this.props;


    if (!products.size > 0) {
      return null;
    }

    return (
      <div></div>
    );
  }
}

const Header = glamorous.div({
  width: '100%',
  height: '184px',
  background: '#f7f7f7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&>h1': {
    fontSize: '48px'
  }
});

const ProductSlider = glamorous.div(({ opacity = false }) => ({
  marginTop: '5%',
  display: 'flex',
  overflowX: 'hidden',
  flexFlow: 'column wrap',
  alignContent: 'flex-start',
  height: '1246px',
  opacity: opacity ? 0.17 : 1,
  '&>a': {
    width: '405px',
    height: '593px',
    marginRight: '20px',
    '&:nth-child(odd)': {
      marginBottom: '60px'
    }
  }
}));

const swipeableConfig = {
  flickThreshold: 0.3,
  preventDefaultTouchmoveEvent: true,
  delta: 40
};

const initialState = {
  currentChunkIndex: 0,
  appendChunkIndex: 1,
  swipe: 'left',
  currentChunk: null
};

