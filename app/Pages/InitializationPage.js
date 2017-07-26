import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import LinearProgress from 'material-ui/LinearProgress';
import glamorous from 'glamorous';

import Page from '../components/Page';
import { setStoreCode, requestAllActiveStores } from '../actions/storeActions';
import getIpAddresses from '../utils/get-ip-addresses';
import { isWhitelisted, getStoreCodeFromIpAddress } from '../utils/store-code-utils';

const Title = glamorous.h1({
  paddingTop: '120px',
  color: 'white',
  textAlign: 'center',
  marginBottom: '12px'
});

const Wrapper = glamorous.div({
  margin: '0 auto',
  display: 'flex',
  width: '260px',
  justifyContent: 'center',
  height: '100vh',
  alignItems: 'center',
  flexDirection: 'column'
});

const progressStyle = { width: '100%' };

class InitializationPage extends Component {
  constructor() {
    super();
    this.state = {
      ipAddress: null
    };
  }

  componentDidMount() {
    this.props.requestAllActiveStores();
    this.startIpCheck();
  }

  componentDidUpdate() {
    const { ipAddress } = this.state;

    if (ipAddress) {
      if (isWhitelisted(ipAddress)) {
        const storeCode = getStoreCodeFromIpAddress(ipAddress);
        this.props.setStoreCode(storeCode);
      } else {
        this.props.replace('/store-selection');
      }
    }
  }

  startIpCheck = () => {
    this.interval = setInterval(() => {
      const [ipAddress] = getIpAddresses();
      if (ipAddress) {
        clearInterval(this.interval);
        this.setState({
          ipAddress
        });
      }
    }, 1000);
  };

  render() {
    if (!this.state.ipAddress) {
      return (
        <Page background="teal" height="1920">
          <Wrapper>
            <Title>
              initializing...
            </Title>
            <LinearProgress style={progressStyle} />
          </Wrapper>
        </Page>
      );
    }

    return null;
  }
}

InitializationPage.propTypes = {
  setStoreCode: PropTypes.func.isRequired,
  requestAllActiveStores: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired
};

export default connect(null, { replace, setStoreCode, requestAllActiveStores })(InitializationPage);
