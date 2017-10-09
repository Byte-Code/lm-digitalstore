import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import glamorous, { Div } from 'glamorous';
import { requestEmailPurchase, requestSmsPurchase } from '../actions/purchaseActions';
import { getEmailSendingStatus, getSmsSendingStatus } from '../reducers/selectors';

import HOTabContainer from './HOTabContainer';
import { QRCodeContent } from './QRCodeContent';
import SendContent from './SendContent';
import CloseButton from './CloseButton';

const contentStyle = { width: '100%' };
const bodyStyle = { padding: 75, background: '#fff' };

class PurchaseDialog extends Component {
  static propTypes = {
    productCode: PropTypes.string.isRequired,
    productSlug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    // requestEmailPurchase: PropTypes.func.isRequired,
    requestSmsPurchase: PropTypes.func.isRequired,
    // emailSendingStatus: PropTypes.bool.isRequired,
    smsSendingStatus: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slideIndex: 0
    };
    this.TabsLabels = {
      qr: {
        title: 'Inquadra il QR-Code',
        subTitle: 'Ti si aprirà il link alla scheda prodotto direttamente sul tuo smartphone.'
      },
      sms: {
        title: 'Inserisci il tuo numero di telefono',
        subTitle: 'Ti invieremo un link alla pagina del prodotto'
      }
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleTabChange = (value) => {
    this.setState({ slideIndex: value });
  };

  render() {
    const { children, productCode, productSlug } = this.props;
    const { open, slideIndex } = this.state;
    const {
      qr: {
        title: qrTitle,
        subTitle: qrSubtitle
        },
      sms: {
        title: smsTitle,
        subTitle: smsSubtitle
        }
      } = this.TabsLabels;
    const UTM_SOURCE = 'utm_source=digitalstore';
    const UTM_MEDIUM = 'utm_medium=digitalstore';
    const UTM_CAMPAIGN = 'utm_campaign=digitalstore';
    const UTMS = `${UTM_SOURCE}&${UTM_MEDIUM}&${UTM_CAMPAIGN}`;
    const url = `https://www.leroymerlin.it/catalogo/${productSlug}-${productCode}-p?${UTMS}`;
    const dialogConfig = { open, contentStyle, bodyStyle, modal: false };
    const tabStyle = {
      tabItemContainerStyle: {
        backgroundColor: 'white'
      },
      inkBarStyle: {
        background: '#67cb33'
      }
    };
    const tabsStyle = {
      buttonStyle: {
        color: '#67cb33'
      }
    };

    return (
      <Div onClick={this.toggleOpen}>
        {children}
        <Dialog {...dialogConfig}>
          <CloseButton handleClick={this.toggleOpen} backgroundColor="#fff" />
          <Tabs onChange={this.handleTabChange} value={slideIndex} {...tabStyle} >
            <Tab label="INVIA VIA SMS" value={0} {...tabsStyle} />
            <Tab label="INVIA VIA EMAIL" value={1} {...tabsStyle} />
            <Tab label="GENERA QR-CODE" value={2} {...tabsStyle} />
          </Tabs>
          <TabsWrapper>
            <SwipeableViews index={slideIndex} onChangeIndex={this.handleChange} >
              <div>1</div>
              <HOTabContainer
                title={smsTitle}
                subTitle={smsSubtitle}
                titleStyle={{ fontSize: '40px' }}
              >
                <SendContent
                  onSubmit={this.props.requestSmsPurchase}
                  sending={this.props.smsSendingStatus}
                />
              </HOTabContainer>
              <HOTabContainer title={qrTitle} subTitle={qrSubtitle} >
                <QRCodeContent url={url} />
              </HOTabContainer>
            </SwipeableViews>
          </TabsWrapper>
        </Dialog>
      </Div>
    );
  }
}

export default connect(
  (state) => ({
    emailSendingStatus: getEmailSendingStatus(state),
    smsSendingStatus: getSmsSendingStatus(state)
  }),
  { requestEmailPurchase, requestSmsPurchase }
)(PurchaseDialog);

const TabsWrapper = glamorous.div({
  marginTop: '10%'
});
