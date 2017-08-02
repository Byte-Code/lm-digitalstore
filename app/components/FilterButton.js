import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const ApplyButton = glamorous.div(({ fontFamily, fontSize, textDecoration, isActive = false }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '320px',
  height: '60px',
  background: isActive ? '#339900' : '#e4e4e4',
  cursor: isActive ? 'pointer' : 'not-allowed',
  marginTop: '22px',
  marginBottom: '27px',
  alignSelf: 'center',
  '&>p': {
    color: '#fff',
    fontFamily,
    fontSize,
    textDecoration,
    marginLeft: '12px'
  }
}));

const FilterButton = ({ onApply, itemCount }) =>
  <ApplyButton
    fontSize="20px"
    onClick={itemCount > 0 ? onApply : () => null}
    isActive={itemCount > 0}
  >
    <p>{`Vedi tutti i ${itemCount} risultati`}</p>
  </ApplyButton>;

FilterButton.propTypes = {
  onApply: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired
};

export default FilterButton;
