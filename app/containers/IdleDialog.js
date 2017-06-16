import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import { getIdleDialog } from '../reducers/selectors';

const bodyStyle = { padding: 32 };

class IdleDialog extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Dialog modal={false} open={this.props.dialogOpen} bodyStyle={bodyStyle}>
        WARNING!!!
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  dialogOpen: getIdleDialog(state)
});

export default connect(mapStateToProps, {})(IdleDialog);
