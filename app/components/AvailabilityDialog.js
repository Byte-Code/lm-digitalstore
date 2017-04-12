import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
`;

const ProductInfo = styled.h3`
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 66px;
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

  render() {
    const { productName, productCode } = this.props;

    return (
      <Wrapper>
        <Title>Verifica Disponibilità</Title>
        <ProductInfo>{`${productName} - REF. ${productCode}`}</ProductInfo>
      </Wrapper>
    );
  }
}
