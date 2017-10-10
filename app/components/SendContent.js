import React, { Component } from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';
import stylePropType from 'react-style-proptype';
import glamorous from 'glamorous';

export default class SendContent extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '', error: null };
    this.onChange = this.onChange.bind(this);
    this.checkBeforeSending = this.checkBeforeSending.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !fromJS(nextProps).equals(this.props);
  }

  componentWillUpdate(nextProps) {
    const submissionCompleted = this.props.sending && !nextProps.sending;
    if (submissionCompleted) {
      this.setState({ inputValue: '' });
    }
  }

  onChange(e) {
    this.setState({
      inputValue: e.target.value,
      error: null
    });
  }

  checkBeforeSending() {
    const { inputValue } = this.state;
    const inputError =
      !inputValue.match(this.props.validator)
      && 'Il valore inserito non è nel formato corretto';

    return inputError
      ? this.setState({ error: inputError })
      : this.props.onSubmit(inputValue);
  }

  render() {
    const { buttonLabel, buttonStyle, sending, fieldText } = this.props;
    const { inputValue, error } = this.state;
    return (
      <Content>
        <TextField
          hintText={fieldText}
          style={{ marginBottom: '5%' }}
          underlineStyle={{ borderColor: '#67cb33' }}
          underlineFocusStyle={{ borderColor: '#67cb33' }}
          disabled={sending}
          onChange={this.onChange}
          errorText={error}
        />
        <RaisedButton
          label={buttonLabel}
          style={buttonStyle}
          labelColor="#67cb33"
          backgroundColor="black"
          disabled={Boolean(error) || sending || !inputValue}
          onClick={this.checkBeforeSending}
        />
      </Content>
    );
  }
}

SendContent.propTypes = {
  buttonLabel: PropTypes.string,
  buttonStyle: stylePropType,
  sending: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  fieldText: PropTypes.string,
  validator: PropTypes.string
};

SendContent.defaultProps = {
  buttonLabel: 'Invia',
  sending: false,
  buttonStyle: {
    width: '200px'
  },
  fieldText: '000 - 00000000',
  validator: ''
};

const Content = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10%'
});
