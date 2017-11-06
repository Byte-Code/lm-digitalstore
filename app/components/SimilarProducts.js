import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import glamorous from 'glamorous';

import ProductBadge from './ProductBadge';
import SimilarProductsDialog from './SimilarProductsDialog';

const Wrapper = glamorous.div({
  paddingLeft: '40px',
  display: 'flex'
});

const Header = glamorous.div({
  width: '130px',
  '&>h3': {
    fontSize: '16px',
    textTransform: 'uppercase',
    paddingRight: '60px'
  }
});

const Slider = glamorous.div({
  display: 'flex',
  overflowX: 'auto',
  '&>div': {
    marginRight: '20px'
  }
});

export default class SimilarProducts extends Component {
  static propTypes = {
    similarProducts: ImmutablePropTypes.list,
    stocks: ImmutablePropTypes.map,
    title: PropTypes.string.isRequired,
    setAnalyticsProductClick: PropTypes.func.isRequired,
    analyticsOpenOverlay: PropTypes.func.isRequired,
    storeCode: PropTypes.string.isRequired
  };

  static defaultProps = {
    similarProducts: List(),
    stocks: Map()
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedProduct: ''
    };
  }

  handleOpen = (product) => {
    this.props.analyticsOpenOverlay(product);
    this.setState({
      selectedProduct: product,
      dialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  renderProducts() {
    const { similarProducts, stocks, storeCode } = this.props;

    return similarProducts.map(p => (
      <ProductBadge
        key={p.get('code')}
        productInfo={p}
        handleClick={() => this.handleOpen(p.get('code'))}
        stock={stocks.getIn([storeCode, p.get('code')])}
      />
    ));
  }

  render() {
    const { similarProducts, title, storeCode, stocks } = this.props;
    if (similarProducts.isEmpty()) {
      return null;
    }
    const { dialogOpen, selectedProduct } = this.state;

    return (
      <Wrapper>
        <Header>
          <h3>{title}</h3>
        </Header>
        <Slider>
          {this.renderProducts()}
        </Slider>
        <SimilarProductsDialog
          similarProducts={similarProducts}
          handleClose={this.handleClose}
          isOpen={dialogOpen}
          selectedProduct={selectedProduct}
          setAnalyticsProductClick={this.props.setAnalyticsProductClick}
          storeCode={storeCode}
          stocks={stocks}
        />
      </Wrapper>
    );
  }
}
