import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {setStoreId} from '../actions/storeIdActions.js';

function SelectStorePage(props) {
  return (
    <div>select store page...
      <button onClick={() => props.setStoreId('ciaone')}>set store id</button>
    </div>
  );
}

export default connect(null, {setStoreId})(SelectStorePage)
