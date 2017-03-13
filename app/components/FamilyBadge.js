import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width}px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.img`
  height: ${props => props.height}px;
`;

const NameWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 15px 10px;
  color: #333333;
`;

const FamilyName = styled.div`
  height: 28px;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.4;
  text-transform: uppercase;
`;

const ItemCount = styled.div`
  height: 20px;
  font-size: 16px;
  line-height: 1.4;
  font-style: italic;
`;

export default class FamilyBadge extends Component {
  static propTypes = {
    family: ImmutablePropTypes.map.isRequired,
    size: PropTypes.string.isRequired
  }

  render() {
    const { family } = this.props;

    const familyName = family.get('familyName');
    const image = family.get('image');
    const itemCount = family.get('itemCount');

    return (
      <Wrapper width={490}>
        <ImageWrapper src={image} alt="alt" height={490} />
        <NameWrapper>
          <FamilyName>{familyName}</FamilyName>
          <ItemCount>{itemCount} prodotti</ItemCount>
        </NameWrapper>
      </Wrapper>
    );
  }
}
