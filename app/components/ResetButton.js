import React, { Component } from 'react';
import { connect } from 'react-redux';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous, { Div } from 'glamorous';
import PropTypes from 'prop-types';
import { getDialogStatus, getTempFilters } from '../reducers/selectors';

class ResetButton extends Component {
  static propTypes = {
    resetTempFilters: PropTypes.func.isRequired,
    resetActiveFilters: PropTypes.func.isRequired,
    filtersList: ImmutablePropTypes.list.isRequired,
    isDialogOpen: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isDialogOpen: false
  };

  constructor(props) {
    super(props);
    this.resetFilters = this.resetFilters.bind(this);
  }

  resetFilters() {
    const { resetTempFilters, resetActiveFilters } = this.props;
    resetTempFilters();
    resetActiveFilters();
  }

  render() {
    const { isDialogOpen, filtersList } = this.props;
    const isFiltersPresent = filtersList.size > 0;


    const button = (
      <Button
        textDecoration="underline"
        fontSize="16px"
        onClick={this.resetFilters}
        id="reset-filterDialog"
      >
        <UndoIcon color="#fff" style={rightIconStyle} />
        <p>Reset Filtri</p>
      </Button>
    );

    return isDialogOpen || isFiltersPresent ? button : <Div />;
  }
}

export default connect(state => ({
  isDialogOpen: getDialogStatus(state),
  filtersList: getTempFilters(state)
}))(ResetButton);

export const Button = glamorous.div(
  ({ fontFamily, fontSize, textDecoration }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '2%',
    position: 'absolute',
    marginTop: '2%',
    zIndex: 20,
    right: 0,
    '&>p': {
      color: '#fff',
      fontFamily,
      fontSize,
      textDecoration,
      marginLeft: '12px'
    }
  })
);

const rightIconStyle = { height: 25, width: 25 };
