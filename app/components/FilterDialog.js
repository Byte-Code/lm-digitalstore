import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List } from 'immutable';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';

import { filterProducts } from '../utils/filterUtils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  height: 41px;
  justify-content: space-between;
  margin-bottom: 30px;
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
    productsByAids: ImmutablePropTypes.set.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      active: props.activeFilters,
    };
  }

  applyAndClose = () => {
    const { applyFilters, handleClose } = this.props;
    const { active } = this.state;
    applyFilters(active);
    handleClose();
  }

  toggleFilter = (filterCode) => {
    const { active } = this.state;
    if (active.includes(filterCode)) {
      return this.setState({ active: active.filterNot(f => f === filterCode) });
    }
    return this.setState({ active: active.push(filterCode) });
  }

  resetFilters = () => {
    this.setState({ active: List() });
  }

  renderFilterGroups = () => {
    const { filterGroups } = this.props;
    const { active } = this.state;
    return filterGroups.map(g => (
      <GroupWrapper key={g.get('code')}>
        <GroupTitle>{g.get('group')}</GroupTitle>
        <FilterWrapper>
          {g.get('filters').map(f => (
            <Filter
              key={f.get('code')}
              onClick={() => this.toggleFilter(f.get('code'))}
              isActive={active.contains(f.get('code'))}
            >
              <p>{f.get('name')}</p>
            </Filter>
          ))}
        </FilterWrapper>
      </GroupWrapper>
    ));
  }

  render() {
    const { handleClose, filterGroups, productsByAids } = this.props;
    const { active } = this.state;
    const totalProducts = productsByAids.isEmpty() ?
    filterProducts(filterGroups, active) :
    filterProducts(filterGroups, active).intersect(productsByAids);
    const result = totalProducts.size;
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
        {this.renderFilterGroups()}
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
