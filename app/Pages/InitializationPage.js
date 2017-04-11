import React, {Component} from 'react';
import {connect} from 'react-redux';
import getIpAddresses from '../utils/get-ip-addresses';
import {isWhitelisted, getStoreCodeFromIpAddress} from '../utils/store-code-utils';
import {setstoreCode} from '../actions/storeCodeActions';
import {replace} from 'react-router-redux';

class InitializationPage extends Component {
  constructor() {
    super();
    this.state = {
      ipAddress: null
    }
    console.log('in initializationPage')
  }
  
  componentDidMount() {
    this.startIpCheck();
  }
  
  startIpCheck = () => {
    this.interval = setInterval(() => {
      const [ipAddress] = getIpAddresses();
      
      if (ipAddress) {
        clearInterval(this.interval)
        console.log(ipAddress)
        this.setState({
          ipAddress
        })
      }
    }, 1000);
  }
  
  componentDidUpdate() {
    const { ipAddress } = this.state;
    const { replace, setstoreCode } = this.props;
    
    if (ipAddress) {
      if (isWhitelisted(ipAddress)) {
        const storeCode = getStoreCodeFromIpAddress(ipAddress)
        setstoreCode(storeCode);
      }
      else {
        replace('/store-selection');
      }
    }
  }
  
  render() {
    if (!this.state.ipAddress) {
      return (
        <div>
          initializing...
        </div>
      );
    }
    
    return null;
  }
}

export default connect(null, { replace, setstoreCode })(InitializationPage);
