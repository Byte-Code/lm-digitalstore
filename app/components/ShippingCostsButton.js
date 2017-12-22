/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';

import ShippingDialog from './ShippingDialog';

export default class ShippingCostsButton extends Component {
  constructor(props) {
    super(props);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.state = { showDialog: false }
  }

  toggleDialog() {
    this.setState({  showDialog: !this.state.showDialog });
  }

  renderDialog() {
    const { showDialog } = this.state;
    const { productInfo } = this.props;
    const shippingProps = { open: showDialog, toggleOpen: this.toggleDialog, productInfo };
    return <ShippingDialog {...shippingProps} />;
  }

  render() {
    const { label, logo } = this.props;
    const { showDialog } = this.state;
    return (
      <ButtonWrapper onClick={this.toggleDialog}>
        <IconContainer>
          <span className={logo} />
        </IconContainer>
        <LabelContainer>{label}</LabelContainer>
        { showDialog && this.renderDialog()}
      </ButtonWrapper>
    );
  }
}

ShippingCostsButton.propsTypes = {
  productInfo: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string
  }).isRequired,
  label: PropTypes.string,
  logo: PropTypes.string
};

ShippingCostsButton.defaultProps = {
  label: 'Calcola costo di spedizione',
  logo: 'truck'
};

const ButtonWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '4%'
});

const LabelContainer = glamorous.p({
  fontSize: '1.2em',
  textDecoration: 'underline',
  textAlign: 'left',
  marginLeft: '4%'
});

const IconContainer = glamorous.div({
  marginTop: '-11px'
});
