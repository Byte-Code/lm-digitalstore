import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import FilterDialog from './FilterDialog';
import ActiveFilters from './ActiveFilters';

const Wrapper = styled.div`
  display: flex;
  height: 71px;
`;

export const Button = styled.div`
  width: 190px;
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

export default class FilterBar extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    resetFilters: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAvailability: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  // TODO separate dialog logic into dialog component?
  render() {
    const {
      applyFilters,
      filterGroups,
      filterMap,
      resetFilters,
      toggleFilter,
      toggleAvailability
    } = this.props;

    if (filterGroups.isEmpty()) {
      return null;
    }

    return (
      <Wrapper>
        <Button onClick={this.handleOpen}>
          <AddIcon color="#fff" style={{ height: 30, width: 30 }} />
          <p>Piú filtri</p>
        </Button>
        <ActiveFilters
          filterMap={filterMap}
          filterGroups={filterGroups}
          resetFilters={resetFilters}
          toggleFilter={toggleFilter}
          toggleAvailability={toggleAvailability}
          handleOpen={this.handleOpen}
        />
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          contentStyle={{ width: '100%', maxWidth: 'none' }}
          bodyStyle={{ padding: 0, background: 'rgba(51, 51, 51, 0.8)' }}
        >
          <FilterDialog
            filterGroups={this.props.filterGroups}
            handleClose={this.handleClose}
            applyFilters={applyFilters}
            filterMap={filterMap}
          />
        </Dialog>
      </Wrapper>
    );
  }
}
