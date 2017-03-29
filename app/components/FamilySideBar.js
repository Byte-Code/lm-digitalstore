import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Map } from 'immutable';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const WorldName = styled.h3`
  font-family: LeroyMerlinSans Italic;
  font-size: 30px;
  width: 136px;
  line-height: 32px;
  margin: 46px 0 30px;
`;

const Family = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 250px;
  box-shadow: 0 0 8px 0 #e4e4e4;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.img`
  width: 190px;
  height: 190px;
`;

const FamilyName = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &>p {
    text-transform: uppercase;
    padding-left: 10px;
    padding-right: 35px;
    font-family: LeroyMerlinSans Bold;
    font-size: 20px;
    line-height: 22px;
  }
`;

export default class FamilySideBar extends Component {
  static propTypes = {
    requestFetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map
  }

  static defaultProps = {
    world: Map()
  }

  componentDidMount() {
    this.props.requestFetchWorld();
  }

  renderFamilies() {
    const { world } = this.props;
    const families = world.get('families');

    return families.map(fam => {
      const familyName = fam.get('familyName');
      const image = fam.get('image');
      const categoryCode = fam.get('categoryCode');

      return (
        <Link
          key={familyName}
          to={`/catalogue/${categoryCode}`}
        >
          <Family>
            <ImageWrapper src={image} />
            <FamilyName>
              <p>{familyName}</p>
            </FamilyName>
          </Family>
        </Link>
      );
    });
  }

  render() {
    const { world } = this.props;

    if (world.isEmpty()) {
      return null;
    }

    const worldName = world.get('worldName');

    return (
      <Wrapper>
        <WorldName>{worldName}</WorldName>
        {this.renderFamilies()}
      </Wrapper>
    );
  }
}
