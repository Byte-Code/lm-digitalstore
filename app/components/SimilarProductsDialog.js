import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import SimilarProductBadge from './SimilarProductBadge';

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  &>div {
    margin-right: 40px;
    &:first-child {
      margin-left: 40px;
    }
  }
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

  renderProducts() {
    const { similarProducts, selectedProduct } = this.props;

    const selectedIndex = similarProducts.findIndex(p => p.get('code') === selectedProduct) || 0;
    const orderedList = similarProducts.skip(selectedIndex)
    .concat(similarProducts.take(selectedIndex));

    return orderedList.map(p => (
      <SimilarProductBadge
        key={p.get('code')}
        productInfo={p}
      />
    ));
  }

  render() {
    const { similarProducts, handleClose, isOpen } = this.props;

    if (similarProducts.isEmpty()) {
      return null;
    }

    return (
      <Dialog
        modal={false}
        onRequestClose={handleClose}
        open={isOpen}
        contentClassName="similarDialog"
        contentStyle={{ width: '100%', maxWidth: 'none', background: 'transparent' }}
        bodyStyle={{ padding: 0, background: 'transparent' }} // TODO min-height to be fixed here
        autoScrollBodyContent
      >
        <Slider>
          {this.renderProducts()}
        </Slider>
      </Dialog>
    );
  }
}
