import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
