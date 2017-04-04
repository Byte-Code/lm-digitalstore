import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 179px;
  background: #333333;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 35px 0 47px;
`;

const GroupName = styled.p`
  font-size: 20px;
  font-family: LeroyMerlinSans Light;
  text-align: center;
  line-height: 32px;
  color: #fff;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  &>div {
    margin-right: 10px;
  }
  &>div:last-child {
    margin-right: 0;
  }
`;

const Filter = styled.div`
  width: 150px;
  height: 42px;
  border-radius: 20px;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &>p {
    line-height: 20px;
    font-size: 16px;
    text-align: center;
  }
`;

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
    const { sellingAids, onToggle } = this.props;
    const aids = sellingAids.get('aids');

    return aids.map(aid => (
      <Filter
        key={aid.get('code')}
        onClick={() => onToggle(aid.get('code'))}
      >
        <p>{aid.get('name')}</p>
      </Filter>
    ));
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
