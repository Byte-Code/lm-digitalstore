import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map, List } from 'immutable';
import glamorous from 'glamorous';

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
    isDialogOpen: PropTypes.bool.isRequired
  };

  static defaultProps = {
    categoryInfo: Map(),
    products: List()
  };

  componentDidMount() {
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
  }

  componentWillUnmount() {
    this.props.clearProductList();
  }

  renderProducts() {
    const { products } = this.props;
    return products.map(p => (
      <Link to={`product/${p.get('code')}`} key={p.get('code')}>
        <ProductBadge productInfo={p} />
      </Link>
    ));
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
        <ProductSlider opacity={isDialogOpen}>
          <FakeMarginDiv />
          {this.renderProducts()}
          <FakeMarginDiv />
        </ProductSlider>
      </div>
    );
  }
}

const FakeMarginDiv = glamorous.div({
  height: '100%',
  width: '40px'
});

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
  overflowX: 'auto',
  flexFlow: 'column wrap',
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
