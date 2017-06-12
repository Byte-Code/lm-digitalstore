import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

const iconStyle = {
  height: 55,
  width: 55,
  cursor: 'pointer',
  alignSelf: 'center',
  marginRight: 15,
  marginLeft: 5
};

const Wrapper = glamorous.div({
  width: 344,
  height: 108,
  display: 'flex'
});

const Info = glamorous.p(({ fontSize, color }) => ({
  fontSize: fontSize || 20,
  color: color || '#fff',
  lineHeight: '20px'
}));

const StoreInfo = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '7px 0 11px'
});

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
        <div>
          <Info color="#58c527">{`A ${formattedDistance} km`}</Info>
          <Info>{`${province} - ${name}`}</Info>
        </div>
        <div>
          <Info fontSize={16}>{`${street} ${streetNumber}`}</Info>
          <Info fontSize={16}>{`${zip} - ${city}, (${province})`}</Info>
        </div>
      </StoreInfo>
    </Wrapper>
  );
};

NearbyStore.propTypes = {
  currentStoreInfo: ImmutablePropTypes.map.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default NearbyStore;
