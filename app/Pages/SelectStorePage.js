import React, {PropTypes} from 'react';
import Page from '../components/Page.js';
import {connect} from 'react-redux';
import {setstoreCode} from '../actions/storeCodeActions.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-top: 120px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import stores from '../../mocks/stores';

function SelectStorePage(props) {
  return (
    <Page background="teal">
      <Title>
        select store
      </Title>
      <Wrapper>
        <SelectField>
          {stores.map(store => (
            <MenuItem value={store.storeCode} primaryText={store.storeName} />
          ))}
        </SelectField>
        <button onClick={() => props.setstoreCode('ciaone')}>set store id</button>
      </Wrapper>
    </Page>
  );
}

export default connect(null, { setstoreCode })(SelectStorePage)
