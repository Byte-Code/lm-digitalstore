import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous, { Div } from 'glamorous';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import { List, ListItem } from 'material-ui/List';
import { Map } from 'immutable';
import ResetButton from './ResetButton';
import * as filtersActions from '../actions/filtersActions';
import {
  getFilterMap,
  getDialogStatus,
  getCategory,
} from '../reducers/selectors';

import FilterDialog from '../containers/FilterDialog';
import ActiveFilters from './ActiveFilters';
import SellingAidsBadge from './SellingAidsBadge';

class FilterBar extends Component {
  static propTypes = {
    resetFilters: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAvailability: PropTypes.func.isRequired,
    toggleFiltersDialog: PropTypes.func.isRequired,
    resetTempFilters: PropTypes.func.isRequired,
    toggleAid: PropTypes.func.isRequired,
    isDialogOpen: PropTypes.bool.isRequired,
    categoryInfo: ImmutablePropTypes.map.isRequired
  };

  constructor(props) {
    super(props);
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  toggleIcon() {
    const iconColor = '#fff';
    return this.props.isDialogOpen
      ? <RemoveIcon color={iconColor} style={leftIconStyle} />
      : <AddIcon color={iconColor} style={leftIconStyle} />;
  }

  togglePrimaryText() {
    const { moreFilters, lessFilters } = labels;
    return this.props.isDialogOpen ? lessFilters : moreFilters;
  }

  render() {
    const {
      categoryInfo,
      filterMap,
      resetFilters,
      toggleFilter,
      toggleAvailability,
      toggleFiltersDialog,
      isDialogOpen,
      resetTempFilters,
      toggleAid,
    } = this.props;

    const facetFilters = categoryInfo.get('facetFilters') || List();
    const filterGroups = facetFilters.filterNot(
      g => g.get('group') === 'Prezzo'
    );
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]) || Map();
    const activeAid = filterMap.get('aid');

    return (
      <div>
        <SellingAidsBadge
          sellingAids={sellingAids}
          onToggle={toggleAid}
          activeAid={activeAid}
        />
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
              primaryText={this.togglePrimaryText()}
              style={ListItemStyle}
              leftIcon={this.toggleIcon()}
              rightIcon={<Div />}
              nestedItems={[
                <FilterDialog
                  key="FilterDialog"
                  filterGroups={filterGroups}
                  handleClose={toggleFiltersDialog}
                  categoryCode={filterMap.get('categoryCode')}
                />
              ]}
            />
          </List>
          <ResetButton
            resetTempFilters={resetTempFilters}
            resetActiveFilters={resetFilters}
          />
        </Wrapper>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const { categoryCode } = ownProps;
    return {
      filterMap: getFilterMap(state),
      isDialogOpen: getDialogStatus(state),
      categoryInfo: getCategory(state, categoryCode)
    };
  },
  { ...filtersActions }
)(FilterBar);

const Wrapper = glamorous.div({
  display: 'flex',
  height: '71px',
  position: 'relative',
  zIndex: 10
});

const ActiveFiltersWrapper = glamorous.div({
  width: '80%',
  marginLeft: '18%',
  position: 'absolute',
  zIndex: 10,
  marginTop: '7px'
});

const leftIconStyle = { height: 30, width: 30 };

const filterListStyle = {
  backgroundColor: 'rgba(51, 51, 51, 0.8)',
  width: '100%'
};

const ListItemStyle = {
  color: 'white'
};

const labels = {
  moreFilters: 'Più filtri',
  lessFilters: 'Chiudi filtri'
};
