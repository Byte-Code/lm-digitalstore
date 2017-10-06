import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import glamorous, { Div } from 'glamorous';

import { QrCode } from './PurchaseTabs';
import CloseButton from './CloseButton';

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
      open: false,
      slideIndex: 0
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
              <div>2</div>
              <QrCode url={url} />
            </SwipeableViews>
          </TabsWrapper>
        </Dialog>
      </Div>
    );
  }
}

const TabsWrapper = glamorous.div({
  marginTop: '10%'
});
