import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import AlertIcon from 'material-ui/svg-icons/alert/warning';
import glamorous from 'glamorous';

import { getIdleDialog } from '../reducers/selectors';
import CountDown from '../components/CountDown';

const Text = glamorous.h1({
  fontSize: 54,
  lineHeight: '70px',
  fontFamily: 'LeroyMerlinSans Bold',
  color: '#333333',
  margin: '48px 0'
});

const SubText = glamorous.p({
  fontSize: 22,
  lineHeight: '32px',
  color: '#67cb33',
  textTransform: 'uppercase'
});

const bodyStyle = { padding: 85, textAlign: 'center' };
const contentStyle = { maxWidth: 'none', width: 830 };
const iconStyle = { width: 80, height: 80, margin: '0 auto' };

class IdleDialog extends Component {
  static propTypes = {
    dialogState: ImmutablePropTypes.map().isRequired
  };

  render() {
    const { dialogState } = this.props;
    const dialogOpen = dialogState.get('dialogOpen');
    const countDownTime = dialogState.get('countDownTime');

    return (
      <Dialog modal={false} open={dialogOpen} bodyStyle={bodyStyle} contentStyle={contentStyle}>
        <AlertIcon style={iconStyle} color="#339900" />
        <Text>
          <p>Tocca lo schermo entro</p>
          &nbsp;<CountDown initialTime={countDownTime / 1000} />&nbsp;
          secondi per continuare la navigazione
        </Text>
        <SubText>La sessione sta per scadere per inattività</SubText>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  dialogState: getIdleDialog(state)
});

export default connect(mapStateToProps, {})(IdleDialog);
