import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width}px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  box-shadow: 0 0 8px 0 #e4e4e4;
`;

const ImageWrapper = styled.img`
  height: ${props => props.height}px;
`;

const NameWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 15px 10px;
  height: 70px;
`;

const FamilyName = styled.div`
  height: 28px;
  font-family: LeroyMerlinSans Bold;
  font-size: 20px;
  line-height: 1.4;
  text-transform: uppercase;
`;

const ItemCount = styled.div`
  height: 20px;
  font-size: 16px;
  line-height: 1.4;
  font-family: LeroyMerlinSans Light-Italic;
`;

export default class FamilyBadge extends Component {
  static propTypes = {
    family: ImmutablePropTypes.map.isRequired,
    size: PropTypes.string.isRequired
  }

  getSize() {
    const { size } = this.props;

    switch (size) {
      case 'square-big':
      default:
        return { height: 490, width: 490 };
      case 'square-small':
        return { height: 235, width: 235 };
      case 'vertical':
        return { height: 560, width: 235 };
      case 'horizontal':
        return { height: 235, width: 490 };
    }
  }

  render() {
    const { family } = this.props;

    const familyName = family.get('familyName');
    const image = family.get('image');
    const itemCount = family.get('itemCount');
    const categoryCode = family.get('categoryCode');
    const { height, width } = this.getSize();

    return (
      <Link to={`/catalogue/${categoryCode}`}>
        <Wrapper width={width}>
          <ImageWrapper
            src={image}
            alt="alt1"
            width={width}
            height={height}
          />
          <NameWrapper>
            <FamilyName>{familyName}</FamilyName>
            <ItemCount>{itemCount} prodotti</ItemCount>
          </NameWrapper>
        </Wrapper>
      </Link>
    );
  }
}
