import React, {Component, PropTypes} from 'react';
import Page from '../components/Page.js';
import {connect} from 'react-redux';
import {setStoreCode} from '../actions/storeCodeActions.js';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

const Title = styled.h1`
  padding-top: 120px;
  color: white;
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

import stores from '../../mocks/stores';

class SelectStorePage extends Component {
  state = {
    storeCode: null
  }
  
  handleChange = (event, index, value) => this.setState({ storeCode: value });
  
  render() {
    return (
      <Page background="teal">
        <Title>
          select store
        </Title>
        <Wrapper>
          <SelectField
            selectedMenuItemStyle={{color: 'teal'}}
            value={this.state.storeCode}
            onChange={this.handleChange}
          >
            {stores.map(store => (
              <MenuItem
                key={store.storeCode} value={store.storeCode} label={store.storeName} primaryText={store.storeName}/>
            ))}
          </SelectField>
          <div>
            <RaisedButton onTouchTap={() => {
              console.log(this.state.storeCode)
              if (this.state.storeCode) {
                this.props.setStoreCode(this.state.storeCode)
              }
            }}>set store id
            </RaisedButton>
          </div>
        </Wrapper>
      </Page>
    );
  }
}

export default connect(null, { setStoreCode })(SelectStorePage)
