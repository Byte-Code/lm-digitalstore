import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, Range } from 'immutable';
import styled from 'styled-components';

import ProductBadge from './ProductBadge';
import ProductSlider from './ProductSlider';

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

const Slide = styled.div`
  margin-right: 20px;
  width: 405px;
  flex-direction: column;
  &>div:first-child {
    margin-bottom: 60px;
  }
`;

const Filters = styled.div`
  height: 75px;
  background: #efefef;
  margin-bottom: 115px;
`;

export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired,
    categoryInfo: ImmutablePropTypes.map
  }

  static defaultProps = {
    categoryInfo: Map()
  }

  componentDidMount() {
    const {
      params: { categoryCode },
      requestFetchCategory
    } = this.props;
    requestFetchCategory(categoryCode);
  }

  chunkItemList(chunkSize) {
    const itemList = this.props.categoryInfo.get('itemList');
    return Range(0, itemList.count(), chunkSize)
      .map(chunkStart => itemList.slice(chunkStart, chunkStart + chunkSize));
  }

  render() {
    const { categoryInfo } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }

    const catName = categoryInfo.get('name');
    const itemList = this.chunkItemList(2);
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
        <Filters>Filters here</Filters>
        <ProductSlider>
          {sliderItems}
        </ProductSlider>
      </div>
    );
  }
}
