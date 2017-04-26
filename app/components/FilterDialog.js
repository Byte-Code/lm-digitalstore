import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List } from 'immutable';
import Toggle from 'material-ui/Toggle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';

import { filterProducts, filterProductsByAvailability, filterCatalogue } from '../utils/filterUtils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  height: 41px;
  justify-content: space-between;
  margin-bottom: 30px;
  margin: 40px 40px;
`;

const Button = styled.div`
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

const ApplyButton = styled(Button)`
  width: 320px;
  height: 60px;
  align-self: center;
  background: ${props => (props.isActive ? '#339900' : '#e4e4e4')};
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  margin-top: 22px;
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

const Filter = styled.div`
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
    activeFilters: ImmutablePropTypes.list.isRequired,
    handleClose: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    idsByAids: ImmutablePropTypes.set.isRequired,
    orderedProducts: ImmutablePropTypes.list.isRequired,
    activeAvailability: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeFilters: props.activeFilters,
      activeAvailability: props.activeAvailability
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
    const { handleClose, filterGroups, idsByAids, orderedProducts } = this.props;
    const { activeFilters, activeAvailability } = this.state;
    const idsByFilters = filterProducts(filterGroups, activeFilters);
    const idsByAvailability = filterProductsByAvailability(orderedProducts, activeAvailability);
    const totalProducts = filterCatalogue(idsByAids, idsByFilters, idsByAvailability);
    const result = totalProducts.size;
    const availabilityLabel = activeAvailability ? 'Disponibile' : 'Indifferente';
    const labelColor = activeAvailability ? '#67cb33' : '#fff';
    const onApply = result > 0 ? this.applyAndClose : () => null;

    return (
      <Wrapper>
        <Header>
          <Button fFamily="LeroyMerlinSans Light" fSize="20px" onClick={handleClose}>
            <RemoveIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Chiudi Filtri</p>
          </Button>
          <Button tDeco="underline" fSize="16px" onClick={this.resetFilters}>
            <UndoIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Reset Filtri</p>
          </Button>
        </Header>
        <Availability>
          <p>Disponibilità in negozio</p>
          <Toggle
            label={availabilityLabel}
            labelPosition="right"
            trackStyle={{ width: 70, height: 42, backgroundColor: '#fff' }}
            trackSwitchedStyle={{ backgroundColor: '#fff' }}
            thumbStyle={{ width: 30, height: 30, top: '10px', left: '36px', backgroundColor: '#f4f4f4' }}
            thumbSwitchedStyle={{ backgroundColor: '#67cb33' }}
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
        <ApplyButton
          fSize="20px"
          onClick={onApply}
          isActive={result > 0}
        >
          <p>{`Vedi tutti i ${result} risultati`}</p>
        </ApplyButton>
      </Wrapper>
    );
  }
}
