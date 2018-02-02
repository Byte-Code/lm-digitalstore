import React, { Component } from 'react';
import glamorous from 'glamorous';

export default class SpinBox extends Component {
  setInputValue = (type) => {
    const element = document.getElementById('SpinBoxNumber');
    let value = parseInt(element.value);

    if (type === 'increase') {
      value += 1;
    } else if (value > 1) {
      value -= 1;
    }

    element.value = value;
  };

  render() {
    return (
      <Wrapper>
        <Button buttonType={'-'} onClick={() => this.setInputValue('decrease')} >-</Button>
        <Input id="SpinBoxNumber" defaultValue="1" />
        <Button buttonType={'+'} onClick={() => this.setInputValue('increase')} >+</Button>
      </Wrapper>
    );
  }
}

const Wrapper = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '320px',
  height: '60px',
  textAlign: 'center',
  backgroundColor: '#4a4a4a'
});

const Button = glamorous.div({
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'sub',
  backgroundColor: '#adadad',
  width: '40px',
  height: '40px',
  fontSize: '2em'
});

const Input = glamorous.input({
  backgroundColor: '#4a4a4a',
  borderWidth: '0px',
  textAlign: 'center',
  color: 'white',
  width: '197px',
  height: '43px',
  fontSize: '36px'
});
