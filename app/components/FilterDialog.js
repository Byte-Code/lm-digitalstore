import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import UndoIcon from 'material-ui/svg-icons/content/undo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  height: 41px;
  justify-content: space-between;
  margin-bottom: 30px;
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

const GroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const GroupTitle = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 13px;
  font-family: LeroyMerlinSans Light;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  &>div {
    margin-right: 10px;
  }
  &>div:last-child {
    margin-right: 0;
  }
`;

const Filter = styled.div`
  width: 150px;
  height: 42px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: ${props => (props.isActive ? '#67cb33' : '#efefef')};
  color: ${props => (props.isActive ? '#efefef' : '#333333')}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &>p {
    line-height: 20px;
    font-size: 16px;
    text-align: center;
  }
`;

export default class FilterDialog extends Component {
  static propTypes = {
    filterGroups: ImmutablePropTypes.list.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  renderFilterGroups() {
    const { filterGroups } = this.props;
    return filterGroups.map(g => (
      <GroupWrapper key={g.get('code')}>
        <GroupTitle>{g.get('group')}</GroupTitle>
        <FilterWrapper>
          {g.get('filters').map(f => (
            <Filter key={f.get('code')}>
              <p>{f.get('name')}</p>
            </Filter>
          ))}
        </FilterWrapper>
      </GroupWrapper>
    ));
  }

  render() {
    const { handleClose } = this.props;

    return (
      <Wrapper>
        <Header>
          <Button fFamily="LeoryMerlinSans Light" fSize="20px" onClick={handleClose}>
            <RemoveIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Chiudi Filtri</p>
          </Button>
          <Button tDeco="underline" fSize="16px">
            <UndoIcon color="#fff" style={{ height: 25, width: 25 }} />
            <p>Reset Filtri</p>
          </Button>
        </Header>
        {this.renderFilterGroups()}
      </Wrapper>
    );
  }
}
