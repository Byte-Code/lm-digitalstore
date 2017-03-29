import React, { Component } from 'react';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';

import FlowerIcon from 'material-ui/svg-icons/maps/local-florist';

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
  display: flex;
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
    return (
      <div>
        <Button onTouchTap={this.toggleMenu}>
          <FlowerIcon color="#fff" style={{ height: 50, width: 50 }} />
          <p>Giardino & Terrazzo</p>
        </Button>
        <Drawer
          docked={false}
          width={365}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
          containerStyle={{ background: 'transparent', boxShadow: 'none', display: 'flex' }}
        >
          <Column
            bgColor="#fff"
            width="275px"
            bShadow="rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px"
          >
            yoyoyo
          </Column>
          <Column bgColor="transparent">
            <Button
              onTouchTap={this.toggleMenu}
              pLeft="275px"
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
