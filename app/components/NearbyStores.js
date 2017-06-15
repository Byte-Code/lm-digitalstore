import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import glamorous, { Div } from 'glamorous';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

const iconStyle = {
  height: 55,
  width: 55,
  cursor: 'pointer',
  marginRight: 15,
  marginLeft: 5
};

const Wrapper = glamorous.div(({ backgroundColor }) => ({
  width: 344,
  height: 108,
  display: 'flex',
  backgroundColor
}));

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

const WhiteBg = glamorous.div({
  position: 'absolute',
  height: 25,
  width: 20,
  zIndex: -1,
  top: 9,
  left: 22,
  backgroundColor: '#fff'
});

const StoreList = glamorous.div({
  overflowX: 'auto',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  height: 150
});

const Label = glamorous.p({
  fontSize: 16,
  color: '#e4e4e4',
  display: 'flex',
  alignItems: 'center',
  margin: '0 20px',
  width: 120
});

const NearbyStore = ({ currentStoreInfo, handleClick, isActive }) => {
  const name = currentStoreInfo.get('name');
  const street = currentStoreInfo.getIn(['address', 'street']);
  const streetNumber = currentStoreInfo.getIn(['address', 'streetNumber']) || '';
  const zip = currentStoreInfo.getIn(['address', 'zipCode']);
  const city = currentStoreInfo.getIn(['address', 'city']);
  const province = currentStoreInfo.getIn(['address', 'state']);
  const distance = currentStoreInfo.get('distance');
  const formattedDistance = Math.floor(distance);
  const backgroundColor = isActive ? '#4a4a4a' : 'transparent';

  return (
    <Wrapper onClick={handleClick} backgroundColor={backgroundColor}>
      <Div position="relative" zIndex={1} alignSelf="center">
        <PlaceIcon style={iconStyle} color="#67cb33" />
        <WhiteBg />
      </Div>
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
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

const NearbyStores = ({ nearbyStores, selectedStore, handleClick }) => {
  if (nearbyStores.isEmpty()) {
    return <StoreList />;
  }

  return (
    <Div display="flex" width={1000}>
      <Label>
        {`Disponibile in ${nearbyStores.size} negozi limitrofi`}
      </Label>
      <StoreList>
        <Div display="flex">
          {nearbyStores.map(s =>
            <NearbyStore
              key={s.get('code')}
              currentStoreInfo={s}
              handleClick={() => handleClick(s.get('code'))}
              isActive={selectedStore === s.get('code')}
            />
          )}
        </Div>
      </StoreList>
    </Div>
  );
};

NearbyStores.propTypes = {
  nearbyStores: ImmutablePropTypes.list,
  selectedStore: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

NearbyStores.defaultProps = {
  nearbyStores: List()
};

export default NearbyStores;
