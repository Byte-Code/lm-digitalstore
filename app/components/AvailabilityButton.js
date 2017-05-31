import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dialog from 'material-ui/Dialog';
import glamorous from 'glamorous';

import AvailabilityMap from '../containers/AvailabilityMap';
import CloseButton from './CloseButton';

export const Button = glamorous.div(({ bgColor }) => ({
  width: '100%',
  textTransform: 'uppercase',
  background: bgColor,
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  boxShadow: '0 0 8px 0 rgba(51, 51, 51, 0.1)',
  cursor: 'pointer'
}));

export default class AvailabilityButton extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    allStoreStock: ImmutablePropTypes.list.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { productName, productCode, allStoreStock } = this.props;

    return (
      <div>
        <Button bgColor="#67cb33" onClick={this.handleOpen}>
          verifica disponibilità in negozi vicini
        </Button>
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.dialogOpen}
          contentStyle={{ width: 1000, maxWidth: 'none' }}
          bodyStyle={{ padding: '75px 70px', background: '#333333' }}
        >
          <CloseButton handleClick={this.handleClose} />
          <AvailabilityMap
            productName={productName}
            productCode={productCode}
            allStoreStock={allStoreStock}
          />
        </Dialog>
      </div>
    );
  }
}
