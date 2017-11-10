import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from 'material-ui';

import AvailabilityMap from '../containers/AvailabilityMap';
import CloseButton from './CloseButton';

const contentStyle = { width: 1000, maxWidth: 'none' };
const bodyStyle = { padding: '75px 0 0', background: '#333333' };

export default class AvailabilityButton extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    hasNearByStores: PropTypes.bool
  };

  static defaultProps = {
    hasNearByStores: true
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      display: ''
    };
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { productName, productCode, hasNearByStores } = this.props;

    return (
      <div >
        <FlatButton
          backgroundColor={hasNearByStores ? '#67cb33' : '#C8C8C8'}
          label={'verifica disponibilità in negozi vicini'}
          onClick={this.handleOpen}
          disabled={!hasNearByStores}
          labelStyle={{ color: '#fff', fontSize: '16px' }}
          style={{ height: '70px' }}
        />
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          <CloseButton handleClick={this.handleClose} />
          <AvailabilityMap productName={productName} productCode={productCode} />
        </Dialog>
      </div>
    );
  }
}
