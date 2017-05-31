import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  height: '179px',
  background: '#333333',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '35px 0 47px'
});

const GroupName = glamorous.p({
  fontSize: '20px',
  fontFamily: 'LeroyMerlinSans Light',
  textAlign: 'center',
  lineHeight: '32px',
  color: '#fff',
  width: '100%'
});

const FilterWrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'flex-end',
  '&>div': {
    marginRight: '10px'
  },
  '&>div:last-child': {
    marginRight: 0
  }
});

export const Filter = glamorous.div(({ isActive = false }) => ({
  minWidth: '150px',
  maxWidth: '300px',
  padding: '0 20px',
  height: '42px',
  borderRadius: '20px',
  backgroundColor: isActive ? '#67cb33' : '#efefef',
  color: isActive ? '#efefef' : '#333333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&>p': {
    lineHeight: '20px',
    fontSize: '16px',
    textAlign: 'center'
  }
}));

export default class SellingAidsBadge extends Component {
  static propTypes = {
    sellingAids: ImmutablePropTypes.map,
    onToggle: PropTypes.func.isRequired,
    activeAid: PropTypes.string
  }

  static defaultProps = {
    sellingAids: Map(),
    activeAid: ''
  }

  renderAids() {
    const { sellingAids, onToggle, activeAid } = this.props;
    const aids = sellingAids.get('aids');

    return aids.map(aid => {
      const aidCode = aid.get('code');
      const isActive = aidCode === activeAid;

      return (
        <Filter
          key={aidCode}
          onClick={() => onToggle(aidCode)}
          isActive={isActive}
        >
          <p>{aid.get('name')}</p>
        </Filter>
      );
    });
  }

  render() {
    const { sellingAids } = this.props;
    if (sellingAids.isEmpty()) {
      return null;
    }
    const groupName = sellingAids.get('group');

    return (
      <Wrapper>
        <GroupName>{groupName}...</GroupName>
        <FilterWrapper>
          {this.renderAids()}
        </FilterWrapper>
      </Wrapper>
    );
  }
}
