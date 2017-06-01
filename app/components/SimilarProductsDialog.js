import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import Dialog from 'material-ui/Dialog';
import Slick from 'react-slick';
import glamorous from 'glamorous';

import SimilarProductBadge from './SimilarProductBadge';
import CloseButton from './CloseButton';

export const Slide = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  marginRight: '75px',
  marginLeft: '-35px'
});

const contentStyle = { width: '100%', maxWidth: 'none', background: 'transparent' };
const bodyStyle = { padding: 0, background: 'transparent' };

export default class SimilarProductsDialog extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedProduct: PropTypes.string.isRequired
  };

  static defaultProps = {
    similarProducts: List()
  };

  // HACK this fixes a bug with slick
  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  initializeSlick() {
    const { similarProducts, selectedProduct } = this.props;

    const selectedIndex = similarProducts.findIndex(p => p.get('code') === selectedProduct) || 0;

    return {
      arrows: false,
      centerMode: true,
      dots: false,
      initialSlide: selectedIndex,
      infinite: false,
      variableWidth: true
    };
  }

  renderProducts() {
    const { similarProducts } = this.props;

    return similarProducts.map(p => (
      <div>
        <Slide key={p.get('code')}>
          <SimilarProductBadge productInfo={p} />
        </Slide>
      </div>
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
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
      >
        <CloseButton handleClick={handleClose} top={-250} />
        <Slick {...settings}>
          {this.renderProducts()}
        </Slick>
      </Dialog>
    );
  }
}
