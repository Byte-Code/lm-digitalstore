import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import CheckIcon from 'material-ui/svg-icons/action/done';
import BlockIcon from 'material-ui/svg-icons/content/clear';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Availability = styled.div`
  display: flex;
  flex-direction: column;
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
  const Icon = isAvailable ? CheckIcon : BlockIcon;

  return (
    <Wrapper>
      <Icon />
      <Availability>
        <p>{`~${availabilty} Pezzi disponibile`}</p>
        <p>{`in negozio a ${storeName}`}</p>
      </Availability>
    </Wrapper>
  );
};

StoreStockBadge.propTypes = {
  currentStoreStock: ImmutablePropTypes.map.isRequired
};

export default StoreStockBadge;
