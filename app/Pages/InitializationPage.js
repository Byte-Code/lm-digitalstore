import React, {Component} from 'react';
import {connect} from 'react-redux';
import getIpAddresses from '../utils/get-ip-addresses';
import {isWhitelisted, getStoreCodeFromIpAddress} from '../utils/store-code-utils';
import {setstoreCode} from '../actions/storeCodeActions';
import {replace} from 'react-router-redux';
import LinearProgress from 'material-ui/LinearProgress';
import styled from 'styled-components';
import Page from '../components/Page.js';

const Title = styled.h1`
  padding-top: 120px;
  color: white;
  text-align: center;
  margin-bottom: 12px;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  width: 260px;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;

class InitializationPage extends Component {
  constructor() {
    super();
    this.state = {
      ipAddress: null
    }
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
        <Page background="teal" height="1920">
          <Wrapper>
            <Title>
              initializing...
            </Title>
            <LinearProgress style={{width: '100%'}}/>
          </Wrapper>
        </Page>
      );
    }
    
    return null;
  }
}

export default connect(null, { replace, setstoreCode })(InitializationPage);
