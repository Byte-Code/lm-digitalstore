import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';

import { getFilteredIDs } from '../reducers/selectors';

const ApplyButton = glamorous.div(({ fontFamily, fontSize, textDecoration, isActive = false }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '320px',
  height: '60px',
  background: isActive ? '#339900' : '#e4e4e4',
  cursor: isActive ? 'pointer' : 'not-allowed',
  marginTop: '22px',
  alignSelf: 'center',
  '&>p': {
    color: '#fff',
    fontFamily,
    fontSize,
    textDecoration,
    marginLeft: '12px'
  }
}));

const FilterButton = ({ onApply, result }) => (
  <ApplyButton
    fontSize="20px"
    onClick={result > 0 ? onApply : () => null}
    isActive={result > 0}
  >
    <p>{`Vedi tutti i ${result} risultati`}</p>
  </ApplyButton>
  );


FilterButton.propTypes = {
  onApply: PropTypes.func.isRequired,
  result: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  result: getFilteredIDs(state, ownProps.filterMap).size
});

export default connect(mapStateToProps, {})(FilterButton);
