import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import FilterDialog from './FilterDialog';

const Wrapper = styled.div`
  display: flex;
  height: 71px;
`;

const Button = styled.div`
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(51, 51, 51, 0.8);
  cursor: pointer;
  &>p {
    font-size: 20px;
    line-height: 32px;
    font-family: LeroyMerlinSans Light;
    margin-left: 12px;
    color: #fff;
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #e4e4e4;
  padding: 0 20px;
  width: 890px;
  &>p {
    font-family: LeroyMerlinSans Italic;
    font-size: 16px;
  }
`;

export default class FilterBar extends Component {
  static propTypes = {
    filters: ImmutablePropTypes.list.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  // TODO separate dialog logic into dialog component?
  render() {
    return (
      <Wrapper>
        <Button onClick={this.handleOpen}>
          <AddIcon color="#fff" style={{ height: 30, width: 30 }} />
          <p>Piú filtri</p>
        </Button>
        <ActiveFilters>
          <p>Tocca per avviare una ricerca avanzata dei prodotti</p>
        </ActiveFilters>
        <Dialog
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.open}
          contentStyle={{ width: '100%', maxWidth: 'none' }}
          bodyStyle={{ padding: '40px', background: 'rgba(51, 51, 51, 0.8)' }}
        >
          <FilterDialog filters={this.props.filters} />
        </Dialog>
      </Wrapper>
    );
  }
}
