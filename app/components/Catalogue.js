import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map, List, fromJS } from 'immutable';
import glamorous from 'glamorous';
import Swipeable from 'react-swipeable';
import * as _ from 'lodash';
import AnalyticsService from '../analytics/AnalyticsService';

import ProductBadge from './ProductBadge';
import SellingAidsBadge from './SellingAidsBadge';
import FilterBar from './FilterBar';


export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    clearProductList: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map,
    products: ImmutablePropTypes.list,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAid: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    toggleAvailability: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    initFilters: PropTypes.func.isRequired,
    toggleFiltersDialog: PropTypes.func.isRequired,
    resetTempFilters: PropTypes.func.isRequired,
    isDialogOpen: PropTypes.bool.isRequired,
    setAnalyticsProductClick: PropTypes.func.isRequired,
    trackCatalogueProductsChunk: PropTypes.func.isRequired,
    routingData: ImmutablePropTypes.map.isRequired
  };

  static defaultProps = {
    categoryInfo: Map(),
    products: List()
  };

  constructor(prop) {
    super(prop);
    this.chunkSize = 4;
    this.productsChunk = List();
    this.onBadgeClick = this.onBadgeClick.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.chunkerizeProductList = this.chunkerizeProductList.bind(this);
    this.getChunks = this.getChunks.bind(this);
    this.state = {
      currentChunkIndex: 0,
      appendChunkIndex: 1
    };
  }

  componentWillMount() {
    const { params: { categoryCode }, requestFetchCategory, initFilters } = this.props;
    initFilters();
    requestFetchCategory(categoryCode);
  }


  componentWillReceiveProps(nextProps) {
    const { params: { categoryCode }, requestFetchCategory, initFilters } = nextProps;
    if (categoryCode !== this.props.params.categoryCode) {
      initFilters();
      requestFetchCategory(categoryCode);
    }

    if (nextProps.products.size > 0) {
      this.chunkerizeProductList(nextProps.products);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const chunkHasChanged = prevState !== this.state;
    const componentReceiveProduct = !prevProps.products.size > 0 && this.props.products.size > 0;

    if (componentReceiveProduct || chunkHasChanged) {
      const currentChunk = this.getChunks().setSize(this.chunkSize);
      const positionIndex = this.chunkSize * this.state.currentChunkIndex;
      this.props.trackCatalogueProductsChunk();
      // Can't use redux-saga https://stackoverflow.com/questions/45435094/redux-saga-takeevery-miss-catch-event
      const path = _.trimStart(this.props.routingData.get('pathname'), '/');
      const pathArray = _.split(path, '/');
      AnalyticsService.setRelatedProduct({
        products: currentChunk,
        pathArray,
        positionIndex
      });
      setTimeout(() => AnalyticsService.track('view'), 500);
    }
  }

  componentWillUnmount() {
    this.props.clearProductList();
  }

  onBadgeClick(product, index) {
    this.props.setAnalyticsProductClick({ product, index });
  }

  onLeftSwipe() {
    let { currentChunkIndex, appendChunkIndex } = this.state;
    if (appendChunkIndex < this.productsChunk.size - 1) {
      const currentIndex = currentChunkIndex += 1;
      const appendIndex = appendChunkIndex += 1;
      this.setState({
        currentChunkIndex: currentIndex,
        appendChunkIndex: appendIndex
      });
    }
  }

  onRightSwipe() {
    let { currentChunkIndex, appendChunkIndex } = this.state;
    if (currentChunkIndex > 0) {
      const currentIndex = currentChunkIndex -= 1;
      const appendIndex = appendChunkIndex -= 1;
      this.setState({
        currentChunkIndex: currentIndex,
        appendChunkIndex: appendIndex
      });
    }
  }

  getChunks() {
    let chunks = List();

    if (this.productsChunk.size > 0) {
      const { currentChunkIndex, appendChunkIndex } = this.state;
      const currentChunk = this.productsChunk.getIn([currentChunkIndex]);
      const appendChunk = this.productsChunk.getIn([appendChunkIndex]);

      chunks = appendChunk ? currentChunk.concat(appendChunk) : currentChunk;
    }
    return chunks;
  }

  chunkerizeProductList(productList) {
    this.productsChunk = fromJS(_.chunk(productList.toJS(), this.chunkSize));
  }

  renderProducts() {
    const products = this.getChunks();
    return products.map((p, index) =>
      <Link onClick={() => this.onBadgeClick(p, index)} to={`product/${p.get('code')}`} key={p.get('code')}>
        <ProductBadge productInfo={p} />
      </Link>
    );
  }

  render() {
    const {
      categoryInfo,
      filterMap,
      toggleAid,
      resetFilters,
      toggleAvailability,
      toggleFilter,
      toggleFiltersDialog,
      isDialogOpen,
      resetTempFilters
    } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }

    const catName = categoryInfo.get('name');
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]) || Map();
    const facetFilters = categoryInfo.get('facetFilters') || List();
    const filterGroups = facetFilters.filterNot(g => g.get('group') === 'Prezzo');
    const activeAid = filterMap.get('aid');
    const swipeableConfig = {
      flickThreshold: 1.6,
      preventDefaultTouchmoveEvent: true,
      delta: 50
    };

    return (
      <div>
        <Header>
          <h1>{catName}</h1>
        </Header>
        <SellingAidsBadge sellingAids={sellingAids} onToggle={toggleAid} activeAid={activeAid} />
        <FilterBar
          filterGroups={filterGroups}
          resetFilters={resetFilters}
          filterMap={filterMap}
          toggleFilter={toggleFilter}
          toggleAvailability={toggleAvailability}
          toggleFiltersDialog={toggleFiltersDialog}
          isDialogOpen={isDialogOpen}
          resetTempFilters={resetTempFilters}
        />
        <Swipeable
          onSwipingLeft={this.onLeftSwipe}
          onSwipingRight={this.onRightSwipe}
          {...swipeableConfig}
        >
          <ProductSlider opacity={isDialogOpen}>
            {this.renderProducts()}
          </ProductSlider>
        </Swipeable>
      </div>
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

