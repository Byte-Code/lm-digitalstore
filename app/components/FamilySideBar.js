import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto'
});

const WorldName = glamorous.h3({
  fontFamily: 'LeroyMerlinSans Italic',
  fontSize: '30px',
  width: '136px',
  lineHeight: '32px',
  margin: '46px 0 30px'
});

const Family = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: '190px',
  height: '250px',
  boxShadow: '0 0 8px 0 #e4e4e4',
  marginBottom: '20px',
  cursor: 'pointer'
});

const ImageWrapper = glamorous.img({
  width: '190px',
  height: '190px'
});

const FamilyName = glamorous.div({
  height: '60px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '&>p': {
    textTransform: 'uppercase',
    paddingLeft: '10px',
    paddingRight: '35px',
    fontFamily: 'LeroyMerlinSans Bold',
    fontSize: '20px',
    lineHeight: '22px'
  }
});

export default class FamilySideBar extends Component {
  static propTypes = {
    requestFetchWorld: PropTypes.func.isRequired,
    world: ImmutablePropTypes.map,
    closeMenu: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };

  static defaultProps = {
    world: Map()
  };

  componentDidMount() {
    this.props.requestFetchWorld();
  }

  handleClick(categoryCode) {
    const { closeMenu, push } = this.props;
    push(`catalogue/${categoryCode}`);
    closeMenu();
  }

  renderFamilies() {
    const { world } = this.props;
    const families = world.get('families');

    return families.map(fam => {
      const familyName = fam.get('familyName');
      const image = fam.get('image');
      const categoryCode = fam.get('categoryCode');

      return (
        <Family
          key={familyName}
          onClick={() => this.handleClick(categoryCode)}
        >
          <ImageWrapper src={image} />
          <FamilyName>
            <p>{familyName}</p>
          </FamilyName>
        </Family>
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
