import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import Slick from 'react-slick';
import styled from 'styled-components';

const Slide = styled.div`
  width: 1000px;
  height: 1420px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
`;
const Img = styled.img`
  display: block;
  width: 1000px;
  height: 1420px;
`;

class TutorialButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = {
    open: false,
  }

  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  getSlickSettings = () => ({
    centerMode: true,
    arrows: false,
    infinite: false,
    variableWidth: true,
    dots: false,
    initialSlide: 0,
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
          contentStyle={{ width: '100%', maxWidth: 'none', background: 'transparent' }}
          bodyStyle={{ padding: 0, background: 'transparent' }}
        >
          <Slick {...settings}>
            <Slide><Img src={require('../assets/tutorial/tutorial1.png')} alt="tutorial 1" /></Slide>
            <Slide><Img src={require('../assets/tutorial/tutorial2.png')} alt="tutorial 2" /></Slide>
            <Slide><Img src={require('../assets/tutorial/tutorial3.png')} alt="tutorial 3" /></Slide>
            <Slide><Img src={require('../assets/tutorial/tutorial4.png')} alt="tutorial 4" /></Slide>
          </Slick>
        </Dialog>

      </div>
    );
  }
}

export default TutorialButton;
