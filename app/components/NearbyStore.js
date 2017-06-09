import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

const iconStyle = { height: 55, width: 55, cursor: 'pointer' };

const Wrapper = glamorous.div({
  width: 200,
  display: 'flex'
});

const StoreInfo = glamorous.div({});

const NearbyStore = ({ currentStoreInfo, handleClick }) => {
  const name = currentStoreInfo.get('name');
  const street = currentStoreInfo.getIn(['address', 'street']);
  const streetNumber = currentStoreInfo.getIn(['address', 'streetNumber']) || '';
  const zip = currentStoreInfo.getIn(['address', 'zipCode']);
  const city = currentStoreInfo.getIn(['address', 'city']);
  const province = currentStoreInfo.getIn(['address', 'state']);
  const distance = currentStoreInfo.get('distance');
  const formattedDistance = Math.floor(distance);

  return (
    <Wrapper onClick={handleClick}>
      <PlaceIcon style={iconStyle} color="#67cb33" />
      <StoreInfo>
        <p>{formattedDistance}</p>
        <p>{`${province} - ${name}`}</p>
        <p>{`${street} ${streetNumber}`}</p>
        <p>{`${zip} - ${city}, (${province})`}</p>
      </StoreInfo>
    </Wrapper>
  );
};

NearbyStore.propTypes = {
  currentStoreInfo: ImmutablePropTypes.map.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default NearbyStore;
