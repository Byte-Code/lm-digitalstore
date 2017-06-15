import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import Dialog from 'material-ui/Dialog';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import FilterDialog from '../containers/FilterDialog';
import ActiveFilters from './ActiveFilters';

const Wrapper = glamorous.div({
  display: 'flex',
  height: '71px'
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

const iconStyle = { height: 30, width: 30 };
const contentStyle = { width: '100%', maxWidth: 'none' };
const bodyStyle = { padding: 0, background: 'rgba(51, 51, 51, 0.8)' };

export default class FilterBar extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    resetFilters: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterMap: ImmutablePropTypes.map.isRequired,
    toggleAvailability: PropTypes.func.isRequired
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
    const { filterGroups, filterMap, resetFilters, toggleFilter, toggleAvailability } = this.props;

    if (filterGroups.isEmpty()) {
      return null;
    }

    return (
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
    );
  }
}
