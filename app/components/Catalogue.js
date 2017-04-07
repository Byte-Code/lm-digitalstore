import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';

import ProductBadge from './ProductBadge';
import SellingAidsBadge from './SellingAidsBadge';
import FilterBar from './FilterBar';
import { filterProducts, filterProductsByAid } from '../utils/utils';

const Header = styled.div`
  width: 100%;
  height: 230px;
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
  height: 1270px;
  &>a {
    width: 405px;
    height: 605px;
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
    setSellingAids: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map,
    products: ImmutablePropTypes.list,
    activeAid: PropTypes.string.isRequired,
    activeFilters: ImmutablePropTypes.list.isRequired,
    router: PropTypes.shape({ location: PropTypes.object.isRequired }).isRequired,
  }

  static defaultProps = {
    categoryInfo: Map(),
    products: List()
  }

  componentDidMount() {
    const {
      params: { categoryCode },
      requestFetchCategory,
      activeFilters,
      activeAid
    } = this.props;
    requestFetchCategory(categoryCode, activeAid, activeFilters);
  }

  toggleAid = (newAid) => {
    const { router, activeAid } = this.props;
    let newQuery;
    if (activeAid === newAid) {
      newQuery = '';
    } else newQuery = encodeURIComponent(newAid);
    router.push({
      pathname: router.location.pathname,
      query: {
        aids: newQuery
      }
    });
  }

  applyFilters = (newFilters) => {
    const { router } = this.props;
    const newQuery = newFilters.map(f => encodeURIComponent(f)).join(',');
    router.push({
      pathname: router.location.pathname,
      query: Object.assign({}, router.location.query, {
        filters: newQuery
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
    return products.map(p => (<ProductBadge productInfo={p} key={p.get('code')} />));
  }

  render() {
    const { categoryInfo, activeAid, activeFilters } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }
    const catName = categoryInfo.get('name');
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]);
    const filterGroups = categoryInfo.get('facetFilters').filterNot(g => g.get('group') === 'Prezzo');

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
          activeFilters={activeFilters}
        />
        <ProductSlider>
          {this.renderProducts()}
          {/* <Waypoint
            onPositionChange={() => {
              setTimeout(
                () => requestFetchProducts(categoryCode, productsToFetch), 2000);
          }} horizontal /> */}
        </ProductSlider>
      </div>
    );
  }
}
