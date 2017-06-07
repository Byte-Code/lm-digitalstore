import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import { List, ListItem } from 'material-ui/List';

import FilterDialog from '../containers/FilterDialog';
import ActiveFilters from './ActiveFilters';

const Wrapper = glamorous.div({
  display: 'flex',
  height: '71px',
  position: 'relative',
  zIndex: 10
});

export const Button = glamorous.div({
  width: '190px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(51, 51, 51, 0.8)',
  cursor: 'pointer',
  '&>p': {
    fontSize: '20px',
    lineHeight: '32px',
    fontFamily: 'LeroyMerlinSans Light',
    marginLeft: '12px',
    color: '#fff'
  }
});

const ActiveFiltersWrapper = glamorous.div({
  width: '73%',
  marginLeft: '10%',
  position: 'absolute',
  zIndex: 10
});

const iconStyle = { height: 30, width: 30 };

export default class FilterBar extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    resetFilters: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAvailability: PropTypes.func.isRequired,
    toggleFiltersDialog: PropTypes.func.isRequired,
    isDialogOpen: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      filterGroups, filterMap, resetFilters, toggleFilter,
      toggleAvailability, toggleFiltersDialog, isDialogOpen } = this.props;

    if (filterGroups.isEmpty()) {
      return null;
    }

    const filterListStyle = {
      backgroundColor: 'rgba(51, 51, 51, 0.8)',
      width: '100%'
    };

    const style = {
      color: 'white'
    };

    return (
      <Wrapper id="filtersListWrapper">
        <List id="filtersList" style={filterListStyle}>
          <ActiveFiltersWrapper id="activeFiltersWrapper">
            <ActiveFilters
              filterMap={filterMap}
              filterGroups={filterGroups}
              resetFilters={resetFilters}
              toggleFilter={toggleFilter}
              toggleAvailability={toggleAvailability}
              handleOpen={this.handleOpen}
            />
          </ActiveFiltersWrapper>
          <ListItem
            onClick={toggleFiltersDialog}
            open={isDialogOpen}
            primaryText="Piú filtri"
            style={style}
            rightIcon={
              <AddIcon color="#fff" style={iconStyle} />
            }
            nestedItems={[
              <FilterDialog
                filterGroups={this.props.filterGroups}
                handleClose={this.handleClose}
                categoryCode={filterMap.get('categoryCode')}
              />
            ]}
          />
        </List>
      </Wrapper>
    );

    /* return (
      <Wrapper>
        <Button onClick={this.handleOpen}>
          <AddIcon color="#fff" style={iconStyle} />
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
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          <FilterDialog
            filterGroups={filterGroups}
            categoryCode={filterMap.get('categoryCode')}
            handleClose={this.handleClose}
          />
        </Dialog>
      </Wrapper>
    ); */
  }
}
