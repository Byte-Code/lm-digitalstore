import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { fromJS, List } from 'immutable';
import Toggle from 'material-ui/Toggle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';

import FilterButton from '../containers/FilterButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin: 40px 0;
`;

const Header = styled.div`
  display: flex;
  height: 41px;
  justify-content: space-between;
  margin-bottom: 30px;
  margin: 0 40px 40px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &>p {
    color: #fff;
    font-family: ${props => props.fFamily};
    font-size: ${props => props.fSize};
    text-decoration: ${props => props.tDeco};
    margin-left: 12px;
  }
`;

const Groups = styled.div`
margin: 0 40px;
`;

const GroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const GroupTitle = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 13px;
  font-family: LeroyMerlinSans Light;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  &>div {
    margin-right: 10px;
  }
  &>div:last-child {
    margin-right: 0;
  }
`;

const Availability = styled.div`
  background: rgba(103, 203, 51, 0.1);
  display: flex;
  flex-direction: column;
  padding: 14px 40px;
  margin-bottom: 31px;
  &>p {
    font-size: 16px;
    color: #fff;
    text-transform: uppercase;
    font-family: LeroyMerlinSans Light;
    margin-bottom: 13px;
  }
`;

export const Filter = styled.div`
  width: 150px;
  height: 42px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: ${props => (props.isActive ? '#67cb33' : '#efefef')};
  color: ${props => (props.isActive ? '#efefef' : '#333333')}
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

export default class FilterDialog extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    handleClose: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired
  }

  constructor(props) {
    super(props);

    const { filterMap } = props;
    this.state = {
      activeAid: filterMap.get('activeAid'),
      activeFilters: filterMap.get('activeFilters'),
      activeAvailability: filterMap.get('activeAvailability'),
      categoryCode: filterMap.get('categoryCode')
    };
  }

  applyAndClose = () => {
    const { applyFilters, handleClose } = this.props;
    const { activeFilters, activeAvailability } = this.state;
    applyFilters(activeFilters, activeAvailability);
    handleClose();
  }

  toggleFilter = (filterCode) => {
    const { activeFilters } = this.state;
    if (activeFilters.includes(filterCode)) {
      return this.setState({ activeFilters: activeFilters.filterNot(f => f === filterCode) });
    }
    return this.setState({ activeFilters: activeFilters.push(filterCode) });
  }

  toggleAvailability = () => {
    const { activeAvailability } = this.state;
    return this.setState({ activeAvailability: !activeAvailability });
  }

  resetFilters = () => {
    this.setState({ activeFilters: List(), activeAvailability: false });
  }

  renderFilterGroups = () => {
    const { filterGroups } = this.props;
    const { activeFilters } = this.state;
    return filterGroups.map(g => (
      <GroupWrapper key={g.get('code')}>
        <GroupTitle>{g.get('group')}</GroupTitle>
        <FilterWrapper>
          {g.get('filters').map(f => (
            <Filter
              key={f.get('code')}
              onClick={() => this.toggleFilter(f.get('code'))}
              isActive={activeFilters.contains(f.get('code'))}
            >
              <p>{f.get('name')}</p>
            </Filter>
          ))}
        </FilterWrapper>
      </GroupWrapper>
    ));
  }

  render() {
    const { handleClose } = this.props;
    const { activeAvailability } = this.state;
    const availabilityLabel = activeAvailability ? 'Disponibile' : 'Indifferente';
    const labelColor = activeAvailability ? '#67cb33' : '#fff';
    const temporaryFilterMap = fromJS(this.state);

    return (
      <Wrapper>
        <Header>
          <Button
            fFamily="LeroyMerlinSans Light"
            fSize="20px"
            onClick={handleClose}
            id="close-filterDialog"
          >
            <RemoveIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Chiudi Filtri</p>
          </Button>
          <Button
            tDeco="underline"
            fSize="16px"
            onClick={this.resetFilters}
            id="reset-filterDialog"
          >
            <UndoIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Reset Filtri</p>
          </Button>
        </Header>
        <Availability>
          <p>Disponibilità in negozio</p>
          <Toggle
            label={availabilityLabel}
            labelPosition="right"
            trackSwitchedStyle={{ width: 70, height: 42, backgroundColor: '#fff' }}
            trackStyle={{ width: 70, height: 42, backgroundColor: '#fff' }}
            thumbStyle={{ width: 30, height: 30, backgroundColor: '#e4e4e4', top: 10, left: 10 }}
            thumbSwitchedStyle={{ backgroundColor: '#67cb33', top: 10, left: 65 }}
            toggled={activeAvailability}
            onToggle={this.toggleAvailability}
            labelStyle={{
              marginLeft: 50,
              fontSize: 16,
              color: labelColor,
              fontFamily: 'LeroyMerlinSans Italic',
              display: 'flex',
              alignItems: 'center'
            }}
          />
        </Availability>
        <Groups>
          {this.renderFilterGroups()}
        </Groups>
        <FilterButton
          onApply={this.applyAndClose}
          filterMap={temporaryFilterMap}
        />
      </Wrapper>
    );
  }
}
