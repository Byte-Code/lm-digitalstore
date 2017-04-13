import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';

import ProductBadge from './ProductBadge';
import SimilarProductsDialog from './SimilarProductsDialog';

const Wrapper = styled.div`
  padding-left: 40px;
  display: flex;
`;

const Header = styled.div`
  width: 90px;
  &>h3 {
    font-size: 16px;
    text-transform: uppercase;
    padding-right: 60px;
  }
`;

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  &>div {
    margin-right: 20px;
  }
`;

export default class SimilarProducts extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list,
  }

  static defaultProps = {
    similarProducts: List()
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedProduct: ''
    };
  }

  handleOpen = (product) => {
    this.setState({
      selectedProduct: product,
      dialogOpen: true
    });
  }

  handleClose = () => {
    this.setState({ dialogOpen: false });
  }

  renderProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <ProductBadge
        key={p.get('code')}
        productInfo={p}
        handleClick={() => this.handleOpen(p.get('code'))}
      />
    ));
  }

  render() {
    const { similarProducts } = this.props;
    if (similarProducts.isEmpty()) {
      return null;
    }
    const { dialogOpen, selectedProduct } = this.state;

    return (
      <Wrapper>
        <Header>
          <h3>prodotti simili</h3>
        </Header>
        <Slider>
          {this.renderProducts()}
        </Slider>
        <SimilarProductsDialog
          similarProducts={similarProducts}
          handleClose={this.handleClose}
          isOpen={dialogOpen}
          selectedProduct={selectedProduct}
        />
      </Wrapper>
    );
  }
}
