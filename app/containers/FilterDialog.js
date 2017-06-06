import { connect } from 'react-redux';

import * as filtersActions from '../actions/filtersActions';
import { getItemCount, getTempAvailability, getTempFilters } from '../reducers/selectors';
import FilterDialog from '../components/FilterDialog';

const mapStateToProps = (state, ownProps) => ({
  availability: getTempAvailability(state),
  activeFilters: getTempFilters(state),
  itemCount: getItemCount(state, ownProps.categoryCode)
});

const mapDispatchToProps = {
  ...filtersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialog);
