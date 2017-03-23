import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
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
    color: #333333;
  }
`;

const Slide = styled.div`
  margin-right: 20px;
  width: 405px;
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

  renderProducts() {
    const itemList = this.props.categoryInfo.get('itemList');
    return itemList.map(item => <Slide><ProductBadge productInfo={item} /></Slide>);
  }

  render() {
    const { categoryInfo } = this.props;

    if (categoryInfo.isEmpty()) {
      return null;
    }

    const catName = categoryInfo.get('name');

    return (
      <div>
        <Header>
          <h1>{catName}</h1>
        </Header>
        <ProductSlider>
          {this.renderProducts()}
        </ProductSlider>
      </div>
    );
  }
}
