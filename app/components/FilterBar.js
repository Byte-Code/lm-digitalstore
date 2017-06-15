import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import { List, ListItem } from 'material-ui/List';

import FilterDialog from '../containers/FilterDialog';
import ActiveFilters from './ActiveFilters';

const Wrapper = glamorous.div({
  display: 'flex',
  height: '71px',
  position: 'relative',
  zIndex: 10
});

const ActiveFiltersWrapper = glamorous.div({
  width: '80%',
  marginLeft: '10%',
  position: 'absolute',
  zIndex: 10
});

const iconStyle = { height: 30, width: 30 };

const filterListStyle = {
  backgroundColor: 'rgba(51, 51, 51, 0.8)',
  width: '100%'
};

const ListItemStyle = {
  color: 'white'
};

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
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  toggleIcon() {
    const iconColor = '#fff';
    return this.props.isDialogOpen
      ? <RemoveIcon color={iconColor} style={iconStyle} />
      : <AddIcon color={iconColor} style={iconStyle} />;
  }

  render() {
    const {
      filterGroups,
      filterMap,
      resetFilters,
      toggleFilter,
      toggleAvailability,
      toggleFiltersDialog,
      isDialogOpen
    } = this.props;

    if (filterGroups.isEmpty()) {
      return null;
    }

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
              handleOpen={toggleFiltersDialog}
            />
          </ActiveFiltersWrapper>
          <ListItem
            onClick={toggleFiltersDialog}
            open={isDialogOpen}
            primaryText="Piú filtri"
            style={ListItemStyle}
            rightIcon={this.toggleIcon()}
            nestedItems={[
              <FilterDialog
                key="FilterDialog"
                filterGroups={this.props.filterGroups}
                handleClose={toggleFiltersDialog}
                categoryCode={filterMap.get('categoryCode')}
              />
            ]}
          />
        </List>
      </Wrapper>
    );
  }
}
