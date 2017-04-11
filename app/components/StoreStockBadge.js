import React from 'react';
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

const StoreStockBadge = ({ currentStoreStock }) => {
  const storeName = currentStoreStock.get('storeName');
  const availabilty = currentStoreStock.get('storeStock') - 2;
  const isAvailable = availabilty > 0;
  const label = isAvailable ?
    `~ ${availabilty} Pezzi disponibile` :
    'Non disponibile';
  const icon = isAvailable ?
    <CheckIcon style={{ width: 40, height: 45 }} color="#58c527" /> :
    <BlockIcon style={{ width: 65, height: 45 }} color="#dddddd" />;

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

StoreStockBadge.propTypes = {
  currentStoreStock: ImmutablePropTypes.map.isRequired
};

export default StoreStockBadge;
