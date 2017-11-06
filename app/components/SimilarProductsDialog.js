import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS, List, Map } from 'immutable';
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
    selectedProduct: PropTypes.string.isRequired,
    setAnalyticsProductClick: PropTypes.func.isRequired,
    analyticsSwipeOverlay: PropTypes.func.isRequired,
    storeCode: PropTypes.string.isRequired,
    stocks: ImmutablePropTypes.map
  };

  static defaultProps = {
    similarProducts: List(),
    stocks: Map()
  };

  constructor(props) {
    super(props);
    this.onSwipe = this.onSwipe.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !fromJS(this.props).equals(fromJS(nextProps));
  }

  // HACK this fixes a bug with slick
  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  onSwipe(e) {
    const code = this.props.similarProducts.get(e).get('code');
    this.props.analyticsSwipeOverlay(code);
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
      variableWidth: true,
      afterChange: this.onSwipe
    };
  }

  renderProducts() {
    const { similarProducts, storeCode, stocks } = this.props;

    return similarProducts.map((p, i) => {
      const stock = stocks.getIn([storeCode, p.get('code')]);
      return (<div key={p.get('code')}>
        <Slide>
          <SimilarProductBadge
            productInfo={p}
            setAnalyticsProductClick={this.props.setAnalyticsProductClick}
            index={i}
            stock={stock}
          />
        </Slide>
      </div>);
    });
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
        open={isOpen}
        contentClassName="similarDialog"
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
      >
        <CloseButton handleClick={handleClose} top={-250} />
        <Slick {...settings} id="slick">
          {this.renderProducts()}
        </Slick>
      </Dialog>
    );
  }
}
