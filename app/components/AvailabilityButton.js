import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

import AvailabilityDialog from './AvailabilityDialog';

const Button = styled.div`
  width: '100%';
  text-transform: uppercase;
  background: ${props => props.bgColor};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  box-shadow:  0 0 8px 0 rgba(51, 51, 51, 0.1);
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;\
  background: rgb(51, 51, 51);
  padding: 10px;
`;

const TitleComponent = ({ handleClick }) => (
  <TitleWrapper>
    <BlockIcon
      style={{ height: 50, width: 50, cursor: 'pointer' }}
      color="#fff"
      onTouchTap={handleClick}
    />
  </TitleWrapper>
);

TitleComponent.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default class AvailabilityButton extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    nearbyStoreStock: ImmutablePropTypes.list.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleClose = () => {
    this.setState({ dialogOpen: false });
  }

  render() {
    const {
      nearbyStoreStock,
      productName,
      productCode
    } = this.props;

    return (
      <div>
        <Button
          bgColor="#67cb33"
          onClick={this.handleOpen}
        >
          verifica disponibilità in negozi vicini
        </Button>
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.dialogOpen}
          contentStyle={{ width: 1000, maxWidth: 'none' }}
          bodyStyle={{ padding: '20px 75px', background: '#333333' }}
          title={<TitleComponent handleClick={this.handleClose} />}
        >
          <AvailabilityDialog
            nearbyStoreStock={nearbyStoreStock}
            productName={productName}
            productCode={productCode}
          />
        </Dialog>
      </div>
    );
  }
}
