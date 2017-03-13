import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: gray;
  position: relative;
`;

const FamilyName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #339900;
  color: white;
  min-height: 42px;
  position: absolute;
  bottom: 0;
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

    return (
      <Wrapper width={490} height={490}>
        <img src={image} alt="alt" />
        <FamilyName>{ familyName }</FamilyName>
      </Wrapper>
    );
  }
}
