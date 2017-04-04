import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  height: 41px;
  justify-content: space-between;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &>p {
    color: #fff;
    font-family: ${props => props.fFamily};
    font-size: ${props => props.fSize};
    text-decoration: ${props => props.tDeco};
    margin-left: 12px;
  }
`;

export default class FilterDialog extends Component {
  static propTypes = {
    filters: ImmutablePropTypes.list.isRequired
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <Button fFamily="LeoryMerlinSans Light" fSize="20px">
            <RemoveIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Chiudi Filtri</p>
          </Button>
          <Button tDeco="underline" fSize="16px">
            <UndoIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Reset Filtri</p>
          </Button>
        </Header>
      </Wrapper>
    );
  }
}
