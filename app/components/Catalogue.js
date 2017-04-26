import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map, List } from 'immutable';
import styled from 'styled-components';

import ProductBadge from './ProductBadge';
import SellingAidsBadge from './SellingAidsBadge';
import FilterBar from './FilterBar';

const Header = styled.div`
  width: 100%;
  height: 184px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  &>h1 {
    font-size: 48px;
  }
`;

const ProductSlider = styled.div`
  margin: 100px 40px 0;
  display: flex;
  overflow-x: auto;
  flex-flow: column wrap;
  height: 1246px;
  &>a {
    width: 405px;
    height: 593px;
    margin-right: 20px;
    &:nth-child(odd) {
      margin-bottom: 60px;
    }
  }
`;

export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map,
    products: ImmutablePropTypes.list,
    filterMap: ImmutablePropTypes.map.isRequired,
    router: PropTypes.shape({ location: PropTypes.object.isRequired }).isRequired,
  }

  static defaultProps = {
    categoryInfo: Map(),
    products: List()
  }

  componentDidMount() {
    const {
      params: { categoryCode },
      requestFetchCategory
    } = this.props;
    requestFetchCategory(categoryCode);
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: { categoryCode },
      requestFetchCategory
    } = nextProps;
    if (categoryCode !== this.props.params.categoryCode) {
      requestFetchCategory(categoryCode);
    }
  }

  toggleAid = (newAid) => {
    const { router, filterMap } = this.props;
    const activeAid = filterMap.get('activeAid');
    let newQuery;
    if (activeAid === newAid) {
      newQuery = '';
    } else newQuery = encodeURIComponent(newAid);
    router.push({
      pathname: router.location.pathname,
      query: Object.assign({}, router.location.query, {
        aids: newQuery
      })
    });
  }

  toggleFilter = (newFilter) => {
    const { router, filterMap } = this.props;
    const activeFilters = filterMap.get('activeFilters');
    let newFilters;
    if (activeFilters.includes(newFilter)) {
      newFilters = activeFilters.filterNot(f => f === newFilter);
    } else newFilters = activeFilters.push(newFilter);
    const newQuery = encodeURIComponent(newFilters.join('&'));
    router.push({
      pathname: router.location.pathname,
      query: Object.assign({}, router.location.query, {
        filters: newQuery
      })
    });
  }

  applyFilters = (newFilters, newAvailability) => {
    const { router } = this.props;
    const newQuery = encodeURIComponent(newFilters.join('&'));
    router.push({
      pathname: router.location.pathname,
      query: Object.assign({}, router.location.query, {
        filters: newQuery,
        availability: newAvailability
      })
    });
  }

  // TODO need a different resetFilters for FiltersDialog
  resetFilters = () => {
    const { router } = this.props;
    router.replace({
      pathname: router.location.pathname
    });
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
    const { categoryInfo, filterMap } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }
    const catName = categoryInfo.get('name');
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]) || Map();
    const facetFilters = categoryInfo.get('facetFilters') || List();
    const filterGroups = facetFilters.filterNot(g => g.get('group') === 'Prezzo');
    const activeAid = filterMap.get('activeAid');

    return (
      <div>
        <Header>
          <h1>{catName}</h1>
        </Header>
        <SellingAidsBadge
          sellingAids={sellingAids}
          onToggle={this.toggleAid}
          activeAid={activeAid}
        />
        <FilterBar
          filterGroups={filterGroups}
          resetFilters={this.resetFilters}
          applyFilters={this.applyFilters}
          filterMap={filterMap}
          toggleFilter={this.toggleFilter}
        />
        <ProductSlider>
          {this.renderProducts()}
        </ProductSlider>
      </div>
    );
  }
}
