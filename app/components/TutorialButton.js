import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, RaisedButton } from 'material-ui';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Slick from 'react-slick';
import glamorous, { Div } from 'glamorous';
import CloseButton from './CloseButton';

const Slide = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '65px',
  marginLeft: '-35px'
});

const Img = glamorous.img({
  display: 'block',
  width: '980px',
  height: '1420px'
});

const contentStyle = {
  width: '100%',
  maxWidth: 'none',
  background: 'transparent',
  height: 1420
};
const bodyStyle = { padding: 0, background: 'transparent' };

const BackButton = glamorous.div({
  position: 'relative',
  width: '982px',
  right: '35px',
  bottom: '99px',
  height: '100px'
});

class TutorialButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    open: false
  };

  getSlickSettings = () => ({
    arrows: false,
    centerMode: true,
    dots: false,
    initialSlide: 0,
    infinite: false,
    variableWidth: true
  });

  closeDialog = () => {
    this.setState({
      open: false
    });
  };

  openDialog = () => {
    this.setState({
      open: true
    });
  };

  render() {
    /* eslint-disable */
    const settings = this.getSlickSettings();
    return (
      <Div id="Carousel" onClick={this.openDialog}>
        {this.props.children}
        <Dialog
          modal={false}
          onRequestClose={this.closeDialog}
          open={this.state.open}
          contentClassName="similarDialog"
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          <CloseButton handleClick={this.closeDialog} top={-250} />
          <Slick {...settings}>
            <div>
              <Slide>
                <Img src={require('../assets/tutorial/tutorial1.png')} alt="tutorial 1" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={require('../assets/tutorial/tutorial2.png')} alt="tutorial 2" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={require('../assets/tutorial/tutorial3.png')} alt="tutorial 3" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={require('../assets/tutorial/tutorial4.png')} alt="tutorial 4" />
              </Slide>
              <BackButton id="BackButton">
                <RaisedButton
                  label="Torna alla navigazione"
                  fullWidth={true}
                  style={{ height: '100%' }}
                  backgroundColor={'#333333'}
                  labelColor={'white'}
                  labelPosition="before"
                  icon={<ArrowForward />}
                  onTouchTap={this.closeDialog}
                />
              </BackButton>
            </div>
          </Slick>
        </Dialog>
      </Div>
    );
    /* eslint-disable */
  }
}

export default TutorialButton;
