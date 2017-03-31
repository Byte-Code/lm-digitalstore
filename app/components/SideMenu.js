import React, { Component } from 'react';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';

import FlowerIcon from 'material-ui/svg-icons/maps/local-florist';
import FamilySideBar from '../containers/FamilySideBar';

const DivWithProps = (props) => <div {...props} />;

const Button = styled(DivWithProps)`
  width: 90px
  height: 120px;
  background: #339900;
  position: fixed;
  left: ${props => (props.pLeft || 0)};
  top: 70px;
  z-index: 2;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  &>p {
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-family: LeroyMerlinSans Italic;
  }
`;

const Column = styled.div`
  background: ${props => props.bgColor || '#fff'};
  width: ${props => props.width || 'auto'};
  box-shadow: ${props => props.bShadow || 'none'};
  overflow: auto;
`;

export default class SideMenu extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onTouchTap={this.toggleMenu} isVisible={!open}>
          <FlowerIcon color="#fff" style={{ height: 50, width: 50 }} />
          <p>Giardino & Terrazzo</p>
        </Button>
        <Drawer
          docked={false}
          width={365}
          open={open}
          onRequestChange={(value) => this.setState({ open: value })}
          containerStyle={{ background: 'transparent', boxShadow: 'none', display: 'flex' }}
        >
          <Column
            bgColor="#fff"
            width="275px"
            bShadow="rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px"
          >
            <FamilySideBar />
          </Column>
          <Column bgColor="transparent">
            <Button
              onTouchTap={this.toggleMenu}
              pLeft="275px"
              isVisible={open}
            >
              <FlowerIcon color="#fff" style={{ height: 50, width: 50 }} />
              <p>Giardino & Terrazzo</p>
            </Button>
          </Column>
        </Drawer>
      </div>
    );
  }
}
