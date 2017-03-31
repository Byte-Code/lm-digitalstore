import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';

import ProductBadge from './ProductBadge';

const Wrapper = styled.div`
  padding-left: 40px;
  display: flex;
  overflow-x: auto;
`;

const Header = styled.div`
  min-width: 160px;
  &>h3 {
    font-size: 16px;
    text-transform: uppercase;
    padding-right: 60px;
  }
`;

const Slider = styled.div`
  display: flex;
  &>a {
    margin-right: 20px;
  }
`;

export default class SimilarProducts extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list
  }

  static defaultProps = {
    similarProducts: List()
  }

  renderProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <ProductBadge key={p.get('code')} productInfo={p} />
    ));
  }

  render() {
    const { similarProducts } = this.props;

    if (similarProducts.isEmpty()) {
      return null;
    }

    return (
      <Wrapper>
        <Header>
          <h3>prodotti simili</h3>
        </Header>
        <Slider>
          {this.renderProducts()}
        </Slider>
      </Wrapper>
    );
  }
}
