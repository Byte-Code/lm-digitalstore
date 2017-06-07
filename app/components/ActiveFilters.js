import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 20px',
  width: '100%',
  '&>p': {
    fontFamily: 'LeroyMerlinSans Italic',
    fontSize: '16px',
    color: 'white',
    marginLeft: '28%',
    marginTop: '2%'
  },
  '&>div': {
    marginRight: '10px'
  }
});

export const Filter = glamorous.div(({ width = '150px', isActive = false }) => ({
  height: '42px',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&>p': {
    lineHeight: '20px',
    fontSize: '16px',
    textAlign: 'center'
  },
  width,
  backgroundColor: isActive ? '#67cb33' : '#efefef',
  color: isActive ? '#efefef' : '#67cb33'
}));

export const ResetButton = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
  cursor: 'pointer',
  '&>p': {
    fontSize: '16px',
    textDecoration: 'underline',
    color: '#fff'
  }
});

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
      <Wrapper onClick={handleOpen}>
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
    <Wrapper>
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
