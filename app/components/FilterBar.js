import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import FilterDialog from './FilterDialog';

const Wrapper = styled.div`
  display: flex;
  height: 71px;
`;

const Button = styled.div`
  width: 190px;
  height: 71px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(51, 51, 51, 0.8);
  cursor: pointer;
  &>p {
    font-size: 20px;
    line-height: 32px;
    font-family: LeroyMerlinSans Light;
    margin-left: 12px;
    color: #fff;
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${props => props.bgColor};
  padding: 0 20px;
  width: 100%;
  &>p {
    font-family: LeroyMerlinSans Italic;
    font-size: 16px;
  }
  &>div {
    margin-right: 10px;
  }
`;

const Filter = styled.div`
  width: ${props => props.width || '150px'};
  height: 42px;
  border-radius: 20px;
  background-color: ${props => (props.isActive ? '#67cb33' : '#efefef')};
  color: ${props => (props.isActive ? '#efefef' : '#67cb33')}
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

const ResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  &>p {
    font-size: 16px;
    text-decoration: underline;
    color: #fff;
  }
`;

export default class FilterBar extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    resetFilters: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired
  }

  renderActiveFilters() {
    const { filterMap, filterGroups, resetFilters, toggleFilter } = this.props;
    const activeFilters = filterMap.get('activeFilters');
    if (activeFilters.isEmpty()) {
      return (
        <ActiveFilters bgColor="#e4e4e4">
          <p>Tocca per avviare una ricerca avanzata dei prodotti</p>
        </ActiveFilters>
      );
    }
    const activeFilterList = filterGroups.reduce((acc, val) =>
      acc.push(val.get('filters').filter(f => activeFilters.includes(f.get('code'))))
      , List()).filterNot(g => g.isEmpty()).flatten(true).take(3);
    return (
      <ActiveFilters bgColor="rgba(51, 51, 51, 0.8)">
        {
          activeFilterList.map(f => (
            <Filter key={f.get('code')} isActive onClick={() => toggleFilter(f.get('code'))}>
              <p>{f.get('name')}</p>
            </Filter>))
        }
        { activeFilters.size > 3 &&
          (<Filter width="178px" onClick={this.handleOpen}>
            <p>Visualizza altri filtri</p>
          </Filter>)
        }
        <ResetButton onClick={resetFilters}>
          <p>Reset filtri</p>
        </ResetButton>
      </ActiveFilters>
    );
  }

  render() {
    const {
      applyFilters,
      filterGroups,
      filterMap
    } = this.props;

    if (filterGroups.isEmpty()) {
      return null;
    }

    return (
      <Wrapper>
        <FilterDialog
          filterGroups={filterGroups}
          applyFilters={applyFilters}
          filterMap={filterMap}
        >
          <Button>
            <AddIcon color="#fff" style={{ height: 30, width: 30 }} />
            <p>Piú filtri</p>
          </Button>
        </FilterDialog>
        {this.renderActiveFilters()}
      </Wrapper>
    );
  }
}
