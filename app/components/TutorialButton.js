import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, RaisedButton } from 'material-ui';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Slick from 'react-slick';
import glamorous, { Div } from 'glamorous';
import CloseButton from './CloseButton';
import * as tutorials from '../assets/tutorial';

class TutorialButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = { open: false };

  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    /* eslint-disable */
    return (
      <Div id={ids.TutorialSlider} onClick={this.toggleDialog}>
        {this.props.children}
        <Dialog
          modal={false}
          onRequestClose={this.toggleDialog}
          open={this.state.open}
          contentClassName="similarDialog"
          contentStyle={contentStyle}
          bodyStyle={bodyStyle}
        >
          <CloseButton handleClick={this.toggleDialog} top={-250} />
          <Slick {...slickSettings}>
            <div>
              <Slide>
                <Img src={tutorials.tutorial1} alt="tutorial 1" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={tutorials.tutorial2} alt="tutorial 2" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={tutorials.tutorial3} alt="tutorial 3" />
              </Slide>
            </div>
            <div>
              <Slide>
                <Img src={tutorials.tutorial4} alt="tutorial 4" />
              </Slide>
              <BackButton id={ids.BackButton}>
                <RaisedButton
                  label={labels.backButton}
                  fullWidth={true}
                  style={{ height: '100%' }}
                  backgroundColor={'#333333'}
                  labelColor={'white'}
                  labelPosition="before"
                  icon={<ArrowForward />}
                  onTouchTap={this.toggleDialog}
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

const ids = {
  BackButton: 'BackButton',
  TutorialSlider: 'TutorialSlider'
};

const labels = {
  backButton: 'Torna alla navigazione'
};

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

const slickSettings = {
  arrows: false,
  centerMode: true,
  dots: false,
  initialSlide: 0,
  infinite: false,
  variableWidth: true
};


export default TutorialButton;
