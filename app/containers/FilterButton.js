import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getFilteredIDs } from '../reducers/selectors';

const ApplyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 60px;
  background: ${props => (props.isActive ? '#339900' : '#e4e4e4')};
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  margin-top: 22px;
  align-self: center;
  &>p {
    color: #fff;
    font-family: ${props => props.fFamily};
    font-size: ${props => props.fSize};
    text-decoration: ${props => props.tDeco};
    margin-left: 12px;
  }
`;

const FilterButton = ({ onApply, result }) => (
  <ApplyButton
    fSize="20px"
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
