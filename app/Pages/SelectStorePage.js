import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import Page from '../components/Page';
import { setStoreCode } from '../actions/storeActions';
import stores from '../../mocks/stores';

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

class SelectStorePage extends Component {
  static propTypes = {
    setStoreCode: PropTypes.func.isRequired
  }

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
            selectedMenuItemStyle={{ color: 'teal' }}
            value={this.state.storeCode}
            onChange={this.handleChange}
          >
            {stores.map(store => (
              <MenuItem
                key={store.storeCode}
                value={store.storeCode}
                label={store.storeName}
                primaryText={store.storeName}
              />
            ))}
          </SelectField>
          <div>
            <RaisedButton
              onTouchTap={() => {
                if (this.state.storeCode) {
                  this.props.setStoreCode(this.state.storeCode);
                }
              }}
            >
              set store id
            </RaisedButton>
          </div>
        </Wrapper>
      </Page>
    );
  }
}

export default connect(null, { setStoreCode })(SelectStorePage);
