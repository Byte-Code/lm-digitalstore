import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Availability = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  &>p {
    font-size: 16px;
    &:first-child {
      font-family: LeroyMerlinSans Bold;
    }
  }
`;

function getStockLabel(stock, stockStatus) {
  if (stock > 0) {
    return stock + (stock === 1 ? ' prodotto disponibile' : ' prodotti disponibili');
  }
  switch (stockStatus) {
    case 'notAvailable':
      return 'Prodotto non disponibile';
    case 'availableOnOrder':
      return 'Prodotto disponibile su ordinazione';
    case 'onRestock':
    default:
      return 'Prodotto in riassortimento';
  }
}

function getStockIcon(stock, stockStatus) {
  if (stock > 0) {
    return <CheckIcon style={{ width: 40, height: 45 }} color="#58c527" />;
  }
  if (stockStatus === 'notAvailable') {
    return <BlockIcon style={{ width: 65, height: 45 }} color="#dddddd" />;
  }
  return null;
}

const StoreStockBadge = ({ currentStoreStock, storeName, showStore }) => {
  const availability = currentStoreStock.get('storeStock');
  const stockStatus = currentStoreStock.get('stockStatus');
  const label = getStockLabel(availability, stockStatus);
  const icon = getStockIcon(availability, stockStatus);

  return (
    <Wrapper>
      {icon}
      <Availability>
        <p>{label}</p>
        {showStore && (<p>{`in negozio a ${storeName}`}</p>)}
      </Availability>
    </Wrapper>
  );
};

// TODO find a better solution for hideStore
StoreStockBadge.propTypes = {
  currentStoreStock: ImmutablePropTypes.map.isRequired,
  storeName: PropTypes.string.isRequired,
  showStore: PropTypes.bool
};

StoreStockBadge.defaultProps = {
  showStore: true
};

export default StoreStockBadge;
