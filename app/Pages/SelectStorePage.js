import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

import Page from '../components/Page';
import { setStoreCode } from '../actions/storeActions';
import stores from '../../mocks/stores';

const Title = styled.h1`
  padding-top: 120px;
  color: rgb(255, 64, 129);
  text-align: center;
  font-size: 48px;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  justify-content: space-between;
  margin: 50px 0;
`;

class SelectStorePage extends Component {
  static propTypes = {
    setStoreCode: PropTypes.func.isRequired
  }

  state = {
    storeCode: null
  }

  handleChange = (value) => this.setState({ storeCode: value });

  render() {
    return (
      <Page background="linear-gradient(0, #64D6E5, #FAFFD1)">
        <Title>
          select store
        </Title>
        <Wrapper>
          <Buttons>
            {stores.map(store => (
              <RaisedButton
                key={store.storeCode}
                onTouchTap={() => this.handleChange(store.storeCode)}
                style={{ margin: '0 20px 20px', width: 225 }}
                primary={this.state.storeCode === store.storeCode}
              >
                {store.storeName}
              </RaisedButton>
              ))}
          </Buttons>
          <div>
            <RaisedButton
              onTouchTap={() => {
                if (this.state.storeCode) {
                  this.props.setStoreCode(this.state.storeCode);
                }
              }}
              style={{ width: 300, height: 50, color: '#fff' }}
              secondary
              label="SET STORE ID"
              labelColor="#fff"
            />
          </div>
        </Wrapper>
      </Page>
    );
  }
}

export default connect(null, { setStoreCode })(SelectStorePage);
