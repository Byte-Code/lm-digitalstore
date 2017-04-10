import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import ProductBadge from './ProductBadge';
import SimilarProductBadge from './SimilarProductBadge';

const Wrapper = styled.div`
  padding-left: 40px;
  display: flex;
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
  overflow-x: auto;
  &>a {
    margin-right: 20px;
  }
  &>div {
    margin-right: 40px;
    &:first-child {
      margin-left: 40px;
    }
  }
`;

export default class SimilarProducts extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list
  }

  static defaultProps = {
    similarProducts: List()
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  renderProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <ProductBadge
        key={p.get('code')}
        productInfo={p}
        handleClick={this.handleOpen}
      />
    ));
  }

  renderSimilarProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <SimilarProductBadge
        key={p.get('code')}
        productInfo={p}
      />
    ));
  }

  // TODO separate dialog logic into dialog component?
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
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          contentClassName="similarDialog"
          contentStyle={{ width: '100%', maxWidth: 'none', background: 'transparent' }}
          bodyStyle={{ padding: 0, background: 'transparent' }}
          autoScrollBodyContent
        >
          <Slider>
            {this.renderSimilarProducts()}
          </Slider>
        </Dialog>
      </Wrapper>
    );
  }
}
