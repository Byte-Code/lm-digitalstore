import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BlockIcon from 'material-ui/svg-icons/navigation/close';
import glamorous from 'glamorous';

import { getStockLabel } from '../utils/utils';

const Wrapper = glamorous.div({
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 0 8px 0 #e4e4e4',
  position: 'absolute',
  top: '-230px',
  left: 0,
  padding: '20px',
  zIndex: 1
});

const Divider = glamorous.div({
  border: '1px dashed #333333',
  width: '100%'
});

const Stock = glamorous.div(({ isAvailable }) => ({
  marginTop: '15px',
  color: isAvailable ? '#67cb33' : '#333333',
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Bold'
}));

const StoreName = glamorous.p({
  fontSize: '20px',
  color: '#262626',
  marginBottom: '10px',
  fontFamily: 'LeroyMerlinSans Bold'
});

const ArrowDown = glamorous.div({
  width: 0,
  height: 0,
  borderLeft: '14px solid transparent',
  borderRight: '14px solid transparent',
  borderTop: '14px solid #fff',
  position: 'absolute',
  bottom: '-14px',
  left: '14px',
  filter: 'drop-shadow(0 2px 0 #e4e4e4)'
});

const Address = glamorous.div({
  marginBottom: '20px',
  '&>p': {
    fontSize: '15px',
    color: '#333333'
  }
});

const iconStyle = {
  width: 24,
  height: 24,
  position: 'absolute',
  top: 5,
  right: 5,
  cursor: 'pointer'
};

const InfoWindow = ({ currentStoreInfo, handleClick }) => {
  const name = currentStoreInfo.get('name');
  const availability = currentStoreInfo.get('storeStock');
  const isAvailable = availability > 0;
  const label = getStockLabel(availability);
  const street = currentStoreInfo.getIn(['address', 'street']);
  const streetNumber = currentStoreInfo.getIn(['address', 'streetNumber']) || '';
  const zip = currentStoreInfo.getIn(['address', 'zipCode']);
  const city = currentStoreInfo.getIn(['address', 'city']);
  const province = currentStoreInfo.getIn(['address', 'state']);

  return (
    <Wrapper>
      <BlockIcon style={iconStyle} fill="#333333" onTouchTap={handleClick} />
      <div>
        <StoreName>{name}</StoreName>
        <Address>
          <p>{`${street} ${streetNumber}`}</p>
          <p>{`${city} - (${province})`}</p>
          <p>{zip}</p>
        </Address>
      </div>
      <Divider />
      <Stock isAvailable={isAvailable}>
        {label}
      </Stock>
      <ArrowDown />
    </Wrapper>
  );
};

InfoWindow.propTypes = {
  currentStoreInfo: ImmutablePropTypes.map.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default InfoWindow;
