import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import Slick from 'react-slick';

import SimilarProductBadge from './SimilarProductBadge';

const Slide = styled.div`
  width: 830px;
  margin-right: 40px;
`;

export default class SimilarProductsDialog extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedProduct: PropTypes.string.isRequired
  }

  static defaultProps = {
    similarProducts: List()
  }

  constructor(props) {
    super(props);
    this.state = {
      initialRender: true
    };
  }

  // HACK this fixes a bug with slick
  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  initializeSlick() {
    const { similarProducts, selectedProduct } = this.props;

    const selectedIndex = similarProducts.findIndex(p => p.get('code') === selectedProduct) || 0;
    const infinite = similarProducts.size > 1;

    return {
      centerMode: true,
      arrows: false,
      variableWidth: true,
      dots: false,
      initialSlide: selectedIndex,
      infinite
    };
  }

  renderProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <Slide key={p.get('code')}>
        <SimilarProductBadge productInfo={p} />
      </Slide>
    ));
  }


  render() {
    const { handleClose, isOpen } = this.props;

    if (!isOpen) {
      return null;
    }

    const settings = this.initializeSlick();

    return (
      <Dialog
        modal={false}
        onRequestClose={handleClose}
        open={isOpen}
        contentClassName="similarDialog"
        contentStyle={{ width: '100%', maxWidth: 'none', background: 'transparent' }}
        bodyStyle={{ padding: 0, background: 'transparent' }}
      >
        <Slick {...settings}>
          {this.renderProducts()}
        </Slick>
      </Dialog>
    );
  }
}
