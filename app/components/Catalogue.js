import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import styled from 'styled-components';

import ProductBadge from './ProductBadge';
import SellingAidsBadge from './SellingAidsBadge';
import { chunkItemList } from '../utils/utils';

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
  margin: 0 40px;
  display: flex;
  overflow-x: auto;
`;

const Slide = styled.div`
  margin-right: 20px;
  width: 405px;
  flex-direction: column;
  &>div:first-child {
    margin-bottom: 60px;
  }
`;

export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map,
    products: ImmutablePropTypes.list,
    activeAids: ImmutablePropTypes.list.isRequired,
    router: PropTypes.shape({ location: PropTypes.object.isRequired }).isRequired,
    filterCatalogueByAids: PropTypes.func.isRequired
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

  componentWillUpdate(nextProps) {
    const filtersChanged = !this.props.activeAids.equals(nextProps.activeAids);
    if (filtersChanged) {
      this.props.filterCatalogueByAids(this.props.categoryInfo.getIn(['sellingAidsProducts', 0, 'aids']), nextProps.activeAids);
    }
  }

  toggleAid(newAid) {
    const { router } = this.props;
    const newQuery = encodeURIComponent(newAid);
    router.push({
      pathname: router.location.pathname,
      query: {
        aids: newQuery
      }
    });
  }

  render() {
    const { categoryInfo, products } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }

    const catName = categoryInfo.get('name');
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]);
    const productsToShow = categoryInfo.get('itemList').filter(p => products.includes(p.get('code')));
    const itemList = chunkItemList(productsToShow, 2);
    const sliderItems = itemList.map(item => {
      const key = `${item.getIn([0, 'code'])}-${item.getIn([1, 'code'])}`;
      return (
        <Slide key={key}>
          <ProductBadge productInfo={item.get(0)} />
          <ProductBadge productInfo={item.get(1)} />
        </Slide>
      );
    }
  );

    return (
      <div>
        <Header>
          <h1>{catName}</h1>
        </Header>
        <SellingAidsBadge sellingAids={sellingAids} onToggle={this.toggleAid.bind(this)} />
        <ProductSlider>
          {sliderItems}
        </ProductSlider>
      </div>
    );
  }
}
