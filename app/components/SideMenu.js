import React, { Component } from 'react';
import glamorous from 'glamorous';
import Drawer from 'material-ui/Drawer';

import FlowerIcon from 'material-ui/svg-icons/maps/local-florist';
import FamilySideBar from '../containers/FamilySideBar';

export const Button = glamorous.div(({ isVisible = false, left = 0 }) => ({
  width: '90px',
  height: '120px',
  background: '#339900',
  position: 'fixed',
  left,
  top: '70px',
  zIndex: 2,
  cursor: 'pointer',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
  display: isVisible ? 'flex' : 'none',
  '&>p': {
    textAlign: 'center',
    color: '#fff',
    fontSize: '16px',
    fontFamily: 'LeroyMerlinSans Italic'
  }
}));

const Column = glamorous.div(({ background, boxShadow = 'none', width = 'auto' }) => ({
  background,
  width,
  boxShadow,
  overflow: 'auto'
}));

const iconStyle = { height: 50, width: 50 };
const drawerContainerStyle = { background: 'transparent', boxShadow: 'none', display: 'flex' };

export default class SideMenu extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.toggleMenu} isVisible={!open}>
          <FlowerIcon color="#fff" style={iconStyle} />
          <p>Giardino & Terrazzo</p>
        </Button>
        <Drawer
          docked={false}
          width={365}
          open={open}
          onRequestChange={value => this.setState({ open: value })}
          containerStyle={drawerContainerStyle}
          swipeAreaWidth={45}
        >
          <Column
            background="#fff"
            width="275px"
            boxShadow="rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px"
          >
            <FamilySideBar closeMenu={this.toggleMenu} />
          </Column>
          <Column background="transparent">
            <Button onClick={this.toggleMenu} left="275px" isVisible={open}>
              <FlowerIcon color="#fff" style={iconStyle} />
              <p>Giardino & Terrazzo</p>
            </Button>
          </Column>
        </Drawer>
      </div>
    );
  }
}
