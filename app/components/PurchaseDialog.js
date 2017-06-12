import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import glamorous, { Div } from 'glamorous';
import Dialog from 'material-ui/Dialog';

import CloseButton from './CloseButton';

const Header = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '114px',
  '&>p': {
    fontSize: '14px',
    textAlign: 'center',
    color: '#67cb33',
    borderBottom: '2px solid #67cb33',
    paddingBottom: '9px',
    textTransform: 'uppercase'
  }
});

const Title = glamorous.h1({
  fontSize: '48px',
  textAlign: 'center',
  marginBottom: '13px'
});

const Subtitle = glamorous.p({
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Light-Italic',
  textAlign: 'center',
  marginBottom: '57px'
});

const Content = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const contentStyle = { width: '100%' };
const bodyStyle = { padding: 75, background: '#fff' };

export default class PurchaseDialog extends Component {
  static propTypes = {
    productCode: PropTypes.string.isRequired,
    productSlug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children, productCode, productSlug } = this.props;
    const url = `https://www.leroymerlin.it/catalogo/${productSlug}-${productCode}-p`;

    return (
      <Div onClick={this.handleOpen}>
        {children}
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          <CloseButton handleClick={this.handleClose} backgroundColor="#fff" />
          <Header>
            <p>genera qr-code</p>
          </Header>
          <Title>Inquadra il QR-Code</Title>
          <Subtitle>
            Ti si aprirà il link alla scheda prodotto direttamente sul tuo smartphone.
          </Subtitle>
          <Content>
            <QRCode value={url} size={200} />
          </Content>
        </Dialog>
      </Div>
    );
  }
}
