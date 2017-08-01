import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import glamorous from 'glamorous';

import Filter from './Filter';

const ActiveFilters = props => {
  const {
    filterMap,
    filterGroups,
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
        <OtherFilters width="178px" onClick={handleOpen}>
          <p>Visualizza altri filtri</p>
        </OtherFilters>}
    </Wrapper>
  );
};

ActiveFilters.propTypes = {
  filterGroups: ImmutablePropTypes.list.isRequired,
  handleOpen: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  filterMap: ImmutablePropTypes.map.isRequired,
  toggleAvailability: PropTypes.func.isRequired
};

export default ActiveFilters;

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
    marginLeft: '16%',
    marginTop: '9px'
  },
  '&>div': {
    marginRight: '10px'
  }
});

export const OtherFilters = glamorous(Filter)({
  color: '#67cb33',
  backgroundColor: '#efefef'
});
