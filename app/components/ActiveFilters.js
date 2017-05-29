import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styled from 'styled-components';

const Wrapper = styled.div`
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

export const Filter = styled.div`
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

export const ResetButton = styled.div`
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

const ActiveFilters = props => {
  const {
    filterMap,
    filterGroups,
    resetFilters,
    toggleFilter,
    toggleAvailability,
    handleOpen
  } = props;

  const activeFilters = filterMap.get('filters');
  const activeAvailability = filterMap.get('availability');

  if (activeFilters.isEmpty() && !activeAvailability) {
    return (
      <Wrapper bgColor="#e4e4e4">
        <p>Tocca per avviare una ricerca avanzata dei prodotti</p>
      </Wrapper>
    );
  }

  const toTake = activeAvailability ? 2 : 3;
  const activeFilterList = filterGroups
    .reduce(
      (acc, val) => acc.push(val.get('filters').filter(f => activeFilters.includes(f.get('code')))),
      List()
    )
    .filterNot(g => g.isEmpty())
    .flatten(true)
    .take(toTake);

  return (
    <Wrapper bgColor="rgba(51, 51, 51, 0.8)">
      {activeFilterList.map(f => (
        <Filter key={f.get('code')} isActive onClick={() => toggleFilter(f.get('code'))}>
          <p>{f.get('name')}</p>
        </Filter>
      ))}
      {activeAvailability &&
        <Filter isActive onClick={toggleAvailability}>
          <p>Disponibile</p>
        </Filter>}
      {activeFilters.size > toTake &&
        <Filter width="178px" onClick={handleOpen}>
          <p>Visualizza altri filtri</p>
        </Filter>}
      <ResetButton onClick={resetFilters}>
        <p>Reset filtri</p>
      </ResetButton>
    </Wrapper>
  );
};

ActiveFilters.propTypes = {
  filterGroups: ImmutablePropTypes.list.isRequired,
  resetFilters: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  filterMap: ImmutablePropTypes.map.isRequired,
  toggleAvailability: PropTypes.func.isRequired
};

export default ActiveFilters;
