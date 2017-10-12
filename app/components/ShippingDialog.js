import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import CloseButton from './CloseButton';
import ShippingCostCalculator from './ShippingCostCalculator';

export default class ShippingDialog extends Component {
  render() {
    const {
      open,
      toggleOpen,
      productInfo: { name, code }
      } = this.props;
    const dialogProps = { modal: false, open, contentStyle, bodyStyle };

    return (
      <Dialog {...dialogProps}>
        <CloseButton handleClick={toggleOpen} />
        <ShippingCostCalculator name={name} code={code} backFn={toggleOpen} />
      </Dialog>
    );
  }
}

ShippingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  productInfo: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string
  }).isRequired
};

const contentStyle = { width: 1000, height: 1420 };
const bodyStyle = { padding: '75px 0 0', background: '#333333' };
