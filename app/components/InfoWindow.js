import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BlockIcon from 'material-ui/svg-icons/navigation/close';
import glamorous from 'glamorous';

import { getStockLabel } from '../utils/utils';

export default class InfoWindow extends React.Component {
  static propTypes = {
    selectedStoreInfo: ImmutablePropTypes.map.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  static getOffsets(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      top: -230,
      borderBottom: '0px',
      borderTop: '14px solid #fff',
      arrowTop: 'initial'
    };
    this.computePosition = this.computePosition.bind(this);
  }

  componentDidMount() {
    setTimeout(this.computePosition, 10);
  }

  computePosition() {
    const pin = document.getElementById('pin');
    const map = document.getElementById('map');
    const pinOffsets = {
      top: pin.parentElement.offsetTop,
      left: pin.parentElement.offsetLeft
    };
    const mapOffsets = {
      top: map.offsetTop,
      left: map.offsetLeft
    };

    if (pinOffsets.top < mapOffsets.top) {
      this.setState({
        top: 50,
        borderBottom: '14px solid white',
        borderTop: '0px',
        arrowTop: '-16px'
      });
    }

    if (pinOffsets.left > mapOffsets.left) {
      this.setState({ left: 100 });
    }
  }

  render() {
    const { selectedStoreInfo, handleClick } = this.props;
    const { top, borderBottom, borderTop, arrowTop, left } = this.state;
    const name = selectedStoreInfo.get('name');
    const availability = selectedStoreInfo.get('storeStock');
    const stockStatus = selectedStoreInfo.get('stockStatus');
    const isAvailable = availability > 0;
    const label = getStockLabel(availability, stockStatus);
    const street = selectedStoreInfo.getIn(['address', 'street']);
    const streetNumber = selectedStoreInfo.getIn(['address', 'streetNumber']) || '';
    const zip = selectedStoreInfo.getIn(['address', 'zipCode']);
    const city = selectedStoreInfo.getIn(['address', 'city']);
    const province = selectedStoreInfo.getIn(['address', 'state']);
    const arrowStyle = { arrowTop, borderTop, borderBottom, left };

    return (
      <Wrapper top={top} left={left} id="pin">
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
        <Arrow {...arrowStyle} />
      </Wrapper>
    );
  }

}

const Wrapper = glamorous.div(({ top, left = 0 }) => ({
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 0 8px 0 #e4e4e4',
  position: 'absolute',
  top: `${top}px`,
  left: `-${left}px`,
  padding: '20px',
  zIndex: 1
}));

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

const Arrow = glamorous.div(({ arrowTop, borderTop, borderBottom, left = 14 }) => ({
  width: 0,
  height: 0,
  borderLeft: '14px solid transparent',
  borderRight: '14px solid transparent',
  borderBottom,
  borderTop,
  position: 'absolute',
  left: `${left}px`,
  filter: 'drop-shadow(0 2px 0 #e4e4e4)',
  top: arrowTop,
  bottom: '-14px'
}));

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
