import React, { Component, PropTypes } from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import CloseButton from './CloseButton';

export const Wrapper = styled.div`
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 114px;
  &>p {
    font-size: 14px;
    text-align: center;
    color: #67cb33;
    border-bottom: 2px solid #67cb33;
    padding-bottom: 9px;
    text-transform: uppercase;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  margin-bottom: 13px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-family: LeroyMerlinSans Light-Italic;
  text-align: center;
  margin-bottom: 57px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class PurchaseDialog extends Component {
  static propTypes = {
    productCode: PropTypes.string.isRequired,
    productSlug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { children, productCode, productSlug } = this.props;
    const url = `https://www.leroymerlin.it/catalogo/${productSlug}-${productCode}-p`;

    return (
      <Wrapper onClick={this.handleOpen}>
        {children}
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          contentStyle={{ width: '100%' }}
          bodyStyle={{ padding: 75, background: '#fff' }}
        >
          <CloseButton handleClick={this.handleClose} backgroundColor="#fff" />
          <Header>
            <p>genera qr-code</p>
          </Header>
          <Title>Genera QR-Code</Title>
          <Subtitle>
            Inquadra il QR-Code con il tuo smartphone per aprire il link alla scheda prodotto.
          </Subtitle>
          <Content>
            <QRCode
              value={url}
              size={200}
            />
          </Content>
        </Dialog>
      </Wrapper>
    );
  }
}
