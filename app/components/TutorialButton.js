import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import Slick from 'react-slick';
import styled from 'styled-components';

import CloseButton from './CloseButton';

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 65px;
  margin-left: -35px;
`;

const Img = styled.img`
  display: block;
  width: 980px;
  height: 1420px;
`;

class TutorialButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = {
    open: false,
  }

  getSlickSettings = () => ({
    arrows: false,
    centerMode: true,
    dots: false,
    initialSlide: 0,
    infinite: false,
    variableWidth: true
  })

  closeDialog = () => {
    this.setState({
      open: false
    });
  }

  openDialog = () => {
    this.setState({
      open: true
    });
  }

  render() {
    const settings = this.getSlickSettings();
    return (
      <div onTouchTap={this.openDialog}>
        {this.props.children}
        <Dialog
          modal={false}
          onRequestClose={this.closeDialog}
          open={this.state.open}
          contentClassName="similarDialog"
          contentStyle={{ width: '100%', maxWidth: 'none', background: 'transparent', height: 1420 }}
          bodyStyle={{ padding: 0, background: 'transparent' }}
        >
          <CloseButton
            handleClick={this.closeDialog}
            top={-250}
          />
          <Slick {...settings}>
            <div><Slide><Img src={require('../assets/tutorial/tutorial1.png')} alt="tutorial 1" /></Slide></div>
            <div><Slide><Img src={require('../assets/tutorial/tutorial2.png')} alt="tutorial 2" /></Slide></div>
            <div><Slide><Img src={require('../assets/tutorial/tutorial3.png')} alt="tutorial 3" /></Slide></div>
            <div><Slide><Img src={require('../assets/tutorial/tutorial4.png')} alt="tutorial 4" /></Slide></div>
          </Slick>
        </Dialog>

      </div>
    );
  }
}

export default TutorialButton;
