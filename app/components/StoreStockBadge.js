import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

import { getStockLabel } from '../utils/utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Availability = styled.div`
  display: flex;
  flex-direction: column;
  &>p {
    font-size: 16px;
    margin-left: 10px;
    &:first-child {
      font-family: LeroyMerlinSans Bold;
    }
  }
`;

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
