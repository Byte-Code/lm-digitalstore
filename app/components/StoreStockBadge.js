import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

import { getStockLabel } from '../utils/utils';

const Wrapper = glamorous.div({
  display: 'flex',
  alignItems: 'center'
});

const Availability = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  '&>p': {
    fontSize: '16px',
    marginLeft: '10px',
    '&:first-child': {
      fontFamily: 'LeroyMerlinSans Bold'
    }
  }
});

function getStockIcon(stock, stockStatus) {
  if (stock > 0) {
    return <CheckIcon style={{ width: 40, height: 45 }} color="#58c527" />;
  }
  if (stockStatus === 'notAvailable') {
    return <BlockIcon style={{ width: 65, height: 45 }} color="#dddddd" />;
  }
  return null;
}

const StoreStockBadge = ({ currentStoreStock, storeName }) => {
  const availability = currentStoreStock.get('storeStock');
  const stockStatus = currentStoreStock.get('stockStatus');
  const label = getStockLabel(availability, stockStatus);
  const icon = getStockIcon(availability, stockStatus);

  return (
    <Wrapper>
      {icon}
      <Availability>
        <p>{label}</p>
        <p>{`in negozio a ${storeName}`}</p>
      </Availability>
    </Wrapper>
  );
};

// TODO find a better solution for hideStore
StoreStockBadge.propTypes = {
  currentStoreStock: ImmutablePropTypes.map.isRequired,
  storeName: PropTypes.string.isRequired
};

export default StoreStockBadge;
