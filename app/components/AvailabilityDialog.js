import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import PlaceIcon from 'material-ui/svg-icons/maps/place';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  line-height: 70px;
`;

const ProductInfo = styled.h3`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 66px;
`;

const StoreList = styled.div`
  display: flex;
  flex-flow: row wrap;
  &>div {
    width: 50%;
  }
`;

const StoreBadge = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  &>p {
    font-size: 16px;
    margin-bottom: 5px;
    &:first-child {
      font-family: LeroyMerlinSans Bold;
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }
  }
`;

export default class AvailabilityDialog extends Component {
  static propTypes = {
    productName: PropTypes.string.isRequired,
    productCode: PropTypes.string.isRequired,
    nearbyStoreStock: ImmutablePropTypes.list.isRequired,
    nearbyStores: ImmutablePropTypes.list.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedStore: -1
    };
  }

  selectStore = (storeCode) => {
    if (this.state.selectStore === storeCode) {
      this.setState({ selectedStore: -1 });
    } else this.setState({ selectedStore: storeCode });
  }

  renderNearbyStores() {
    const { nearbyStores } = this.props;
    const { selectedStore } = this.state;
    return nearbyStores.map(s => {
      const code = s.get('code');
      const isActive = code === selectedStore;
      const province = s.getIn(['address', 'state']);
      const street = s.getIn(['address', 'street']);
      const streetNumber = s.getIn(['address', 'streetNumber']) || '';
      const zip = s.getIn(['address', 'zipCode']);
      const city = s.getIn(['address', 'city']);
      const name = s.get('name');
      return (
        <StoreBadge
          key={code}
          isActive={isActive}
          onClick={() => this.selectStore(code)}
        >
          <PlaceIcon style={{ height: 55, width: 55 }} color="#67cb33" />
          <StoreInfo>
            <p>{`${province} - ${name}`}</p>
            <p>{`${street} ${streetNumber}`}</p>
            <p>{`${zip} - ${city} (${province})`}</p>
          </StoreInfo>
        </StoreBadge>
      );
    });
  }

  render() {
    const { productName, productCode } = this.props;

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
        <StoreList>
          {this.renderNearbyStores()}
        </StoreList>
      </Wrapper>
    );
  }
}
