import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import { fromJS, List } from 'immutable';
import Toggle from 'material-ui/Toggle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';

import FilterButton from '../containers/FilterButton';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  margin: '40px 0'
});

const Header = glamorous.div({
  display: 'flex',
  height: '41px',
  justifyContent: 'space-between',
  marginBottom: '30px',
  margin: '0 40px 40px'
});

export const Button = glamorous.div(({ fontFamily, fontSize, textDecoration }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&>p': {
    color: '#fff',
    fontFamily,
    fontSize,
    textDecoration,
    marginLeft: '12px'
  }
}));

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
    marginRight: '10px'
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

export const Filter = glamorous.div(({ isActive = false }) => ({
  width: '150px',
  height: '42px',
  borderRadius: '20px',
  marginBottom: '20px',
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

const iconStyle = { height: 25, width: 25 };
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

export default class FilterDialog extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    handleClose: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired
  };

  constructor(props) {
    super(props);

    const { filterMap } = props;
    this.state = {
      aid: filterMap.get('aid'),
      filters: filterMap.get('filters'),
      availability: filterMap.get('availability'),
      categoryCode: filterMap.get('categoryCode')
    };
  }

  applyAndClose = () => {
    const { applyFilters, handleClose } = this.props;
    applyFilters(fromJS(this.state));
    handleClose();
  };

  toggleFilter = filterCode => {
    const { filters } = this.state;
    if (filters.includes(filterCode)) {
      return this.setState({ filters: filters.filterNot(f => f === filterCode) });
    }
    return this.setState({ filters: filters.push(filterCode) });
  };

  toggleAvailability = () => {
    const { availability } = this.state;
    return this.setState({ availability: !availability });
  };

  resetFilters = () => {
    this.setState({ filters: List(), availability: false });
  };

  renderFilterGroups = () => {
    const { filterGroups } = this.props;
    const { filters } = this.state;
    return filterGroups.map(g => (
      <GroupWrapper key={g.get('code')}>
        <GroupTitle>{g.get('group')}</GroupTitle>
        <FilterWrapper>
          {g.get('filters').map(f => (
            <Filter
              key={f.get('code')}
              onClick={() => this.toggleFilter(f.get('code'))}
              isActive={filters.contains(f.get('code'))}
            >
              <p>{f.get('name')}</p>
            </Filter>
          ))}
        </FilterWrapper>
      </GroupWrapper>
    ));
  };

  render() {
    const { handleClose } = this.props;
    const { availability } = this.state;
    const availabilityLabel = availability ? 'Disponibile' : 'Indifferente';
    const labelColor = availability ? '#67cb33' : '#fff';
    const temporaryFilterMap = fromJS(this.state);

    return (
      <Wrapper>
        <Header>
          <Button
            fontFamily="LeroyMerlinSans Light"
            fontSize="20px"
            onClick={handleClose}
            id="close-filterDialog"
          >
            <RemoveIcon color="#fff" style={iconStyle} />
            <p>Chiudi Filtri</p>
          </Button>
          <Button
            textDecoration="underline"
            fontSize="16px"
            onClick={this.resetFilters}
            id="reset-filterDialog"
          >
            <UndoIcon color="#fff" style={iconStyle} />
            <p>Reset Filtri</p>
          </Button>
        </Header>
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
            onToggle={this.toggleAvailability}
            labelStyle={labelStyle(labelColor)}
          />
        </Availability>
        <Groups>
          {this.renderFilterGroups()}
        </Groups>
        <FilterButton onApply={this.applyAndClose} filterMap={temporaryFilterMap} />
      </Wrapper>
    );
  }
}
