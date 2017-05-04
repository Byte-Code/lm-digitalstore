import { PropTypes } from 'react';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const mockStore = configureStore([]);

export default function mountWithStore(component, store = Map()) {
  const context = {
    store: mockStore(store),
    muiTheme: getMuiTheme()
  };
  const childContextTypes = {
    store: PropTypes.object,
    muiTheme: PropTypes.object
  };
  return mount(component, { context, childContextTypes });
}
