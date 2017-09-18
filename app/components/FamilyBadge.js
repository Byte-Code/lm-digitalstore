import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import glamorous from 'glamorous';

export const Wrapper = glamorous.div(({ width }) => ({
  width: `${width}px`,
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  boxShadow: '0 0 8px 0 #e4e4e4',
  cursor: 'pointer'
}));

export const ImageWrapper = glamorous.img(({ height }) => ({
  height: `${height}px`
}));

const NameWrapper = glamorous.div({
  width: '100%',
  backgroundColor: '#ffffff',
  padding: '10px 15px 15px',
  height: '70px'
});

const FamilyName = glamorous.div({
  height: '28px',
  fontFamily: 'LeroyMerlinSans Bold',
  fontSize: '20px',
  lineHeight: '1.4',
  textTransform: 'uppercase'
});

export default class FamilyBadge extends Component {
  static propTypes = {
    family: ImmutablePropTypes.map.isRequired,
    size: PropTypes.string.isRequired
  };

  getSize() {
    const { size } = this.props;

    switch (size) {
      case 'square-big':
        return { height: 561, width: 490 };
      case 'square-small':
        return { height: 235, width: 235 };
      case 'horizontal':
        return { height: 235, width: 490 };
      case 'horizontal-big':
        return { height: 235, width: 745 };
      default:
        return { height: 235, width: 490 };
    }
  }

  render() {
    const { family } = this.props;

    const familyName = family.get('familyName');
    const image = family.get('image');
    const categoryCode = family.get('categoryCode');
    const { height, width } = this.getSize();

    return (
      <Link to={`/catalogue/${categoryCode}`}>
        <Wrapper width={width}>
          <ImageWrapper src={image} alt="alt1" width={width} height={height} />
          <NameWrapper>
            <FamilyName>{familyName}</FamilyName>
          </NameWrapper>
        </Wrapper>
      </Link>
    );
  }
}
