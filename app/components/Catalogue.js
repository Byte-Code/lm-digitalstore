import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map, List } from 'immutable';
import glamorous from 'glamorous';
import Swipe from 'react-easy-swipe';

import ProductBadge from './ProductBadge';
import SellingAidsBadge from './SellingAidsBadge';
import FilterBar from './FilterBar';

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

const ProductSlider = glamorous.div(({ marginLeft = '5%' }) => ({
  marginTop: '5%',
  marginRight: '5%',
  marginLeft,
  display: 'flex',
  overflowX: 'auto',
  flexFlow: 'column wrap',
  height: '1246px',
  '&>a': {
    width: '405px',
    height: '593px',
    marginRight: '20px',
    '&:nth-child(odd)': {
      marginBottom: '60px'
    }
  }
}));

export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map,
    products: ImmutablePropTypes.list,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAid: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    toggleAvailability: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    initFilters: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    categoryInfo: Map(),
    products: List()
  };

  constructor(props) {
    super(props);
    this.state = {
      marginLeft: '5%'
    };
    this.moving = false;
    this.marginLeft = '5%';
    this.count = 0;
  }

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

  onSwipeMove = () => {
    if (this.count === 0) {
      this.setState({ marginLeft: '0%' });
      this.count = 1;
    }
  };

  onSwipeEnd = () => {
    if (this.count === 1) {
      this.setState({ marginLeft: '5%' });
      this.count = 0;
    }
  };

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
      applyFilters
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
          applyFilters={applyFilters}
          filterMap={filterMap}
          toggleFilter={toggleFilter}
          toggleAvailability={toggleAvailability}
        />
        <Swipe onSwipeMove={this.onSwipeMove} onSwipeEnd={this.onSwipeEnd}>
          <ProductSlider marginLeft={this.state.marginLeft}>
            {this.renderProducts()}
          </ProductSlider>
        </Swipe>
      </div>
    );
  }
}
