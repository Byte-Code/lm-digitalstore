import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import Toggle from 'material-ui/Toggle';

import FilterButton from './FilterButton';
import Filter from './Filter';

export default class FilterDialog extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    activeFilters: ImmutablePropTypes.list.isRequired,
    initTempFilters: PropTypes.func.isRequired,
    applyTempFilters: PropTypes.func.isRequired,
    toggleTempAvailability: PropTypes.func.isRequired,
    toggleTempFilter: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    availability: PropTypes.bool.isRequired,
    itemCount: PropTypes.number.isRequired
  };

  componentWillMount() {
    this.props.initTempFilters();
  }

  applyAndClose = () => {
    const { applyTempFilters, handleClose } = this.props;
    applyTempFilters();
    handleClose();
  };

  renderFilterGroups = () => {
    const { filterGroups, toggleTempFilter, activeFilters } = this.props;
    return filterGroups.map(g =>
      <GroupWrapper key={g.get('code')}>
        <GroupTitle>{g.get('group')}</GroupTitle>
        <FilterWrapper>
          {g.get('filters').map(f =>
            <Filter
              key={f.get('code')}
              onClick={() => toggleTempFilter(f.get('code'))}
              isActive={activeFilters.contains(f.get('code'))}
            >
              <p>{f.get('name')}</p>
            </Filter>
          )}
        </FilterWrapper>
      </GroupWrapper>
    );
  };

  render() {
    const {
      toggleTempAvailability,
      availability,
      itemCount
    } = this.props;
    const availabilityLabel = availability ? 'Disponibile' : 'Indifferente';
    const labelColor = availability ? '#67cb33' : '#fff';

    return (
      <Wrapper id="filtersDialog">
        <Availability>
          <p>Disponibilità in negozio</p>
          <Toggle
            label={availabilityLabel}
            labelPosition="right"
            trackSwitchedStyle={trackSwitchedStyle}
            trackStyle={trackStyle}
            thumbStyle={thumbStyle}
            thumbSwitchedStyle={thumbSwitchedStyle}
            toggled={availability}
            onToggle={toggleTempAvailability}
            labelStyle={labelStyle(labelColor)}
          />
        </Availability>
        <Groups>
          {this.renderFilterGroups()}
        </Groups>
        <FilterButton onApply={this.applyAndClose} itemCount={itemCount} />
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  backgroundColor: 'rgba(51, 51, 51, 1)'
});

const Groups = glamorous.div({
  margin: '0 40px'
});

const GroupWrapper = glamorous.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px'
});

const GroupTitle = glamorous.div({
  fontSize: '16px',
  textTransform: 'uppercase',
  marginBottom: '13px',
  fontFamily: 'LeroyMerlinSans Light'
});

const FilterWrapper = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  '&>div': {
    marginRight: '10px',
    marginBottom: 20
  },
  '&>div:last-child': {
    marginRight: 0
  }
});

const Availability = glamorous.div({
  background: 'rgba(103, 203, 51, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  padding: '14px 40px',
  marginBottom: '31px',
  '&>p': {
    fontSize: '16px',
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: 'LeroyMerlinSans Light',
    marginBottom: '13px'
  }
});

const trackSwitchedStyle = { width: 70, height: 42, backgroundColor: '#fff' };
const trackStyle = { width: 70, height: 42, backgroundColor: '#fff' };
const thumbStyle = { width: 30, height: 30, backgroundColor: '#e4e4e4', top: 10, left: 10 };
const thumbSwitchedStyle = { backgroundColor: '#67cb33', top: 10, left: 65 };
const labelStyle = labelColor => ({
  marginLeft: 50,
  fontSize: 16,
  color: labelColor,
  fontFamily: 'LeroyMerlinSans Italic',
  display: 'flex',
  alignItems: 'center'
});
