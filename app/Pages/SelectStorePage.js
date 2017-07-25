import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import RaisedButton from 'material-ui/RaisedButton';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Page from '../components/Page';
import { setStoreCode } from '../actions/storeActions';
import { getSelectStoreList } from '../reducers/selectors';

const Title = glamorous.h1({
  paddingTop: '120px',
  color: 'rgb(255, 64, 129)',
  textAlign: 'center',
  fontSize: '48px',
  textTransform: 'uppercase'
});

const Wrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

const Buttons = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  width: '600px',
  justifyContent: 'space-between',
  margin: '50px 0'
});

const storeButtonStyle = { margin: '0 20px 20px', width: 225 };
const confirmButtonStyle = { width: 300, height: 50, color: '#fff' };

class SelectStorePage extends Component {
  static propTypes = {
    setStoreCode: PropTypes.func.isRequired,
    stores: ImmutablePropTypes.list.isRequired
  };

  state = {
    storeCode: null
  };

  handleChange = value => this.setState({ storeCode: value });

  render() {
    return (
      <Page background="linear-gradient(0, #64D6E5, #FAFFD1)">
        <Title>
          select store
        </Title>
        <Wrapper>
          <Buttons>
            {this.props.stores.map(store => (
              <RaisedButton
                key={store.get('code')}
                onTouchTap={() => this.handleChange(store.get('code'))}
                style={storeButtonStyle}
                primary={this.state.storeCode === store.get('code')}
              >
                {store.get('name')}
              </RaisedButton>
            ))}
          </Buttons>
          <div>
            <RaisedButton
              onTouchTap={() => {
                if (this.state.storeCode) {
                  this.props.setStoreCode(this.state.storeCode);
                }
              }}
              style={confirmButtonStyle}
              secondary
              label="SET STORE ID"
              labelColor="#fff"
            />
          </div>
        </Wrapper>
      </Page>
    );
  }
}

export default connect(
  (state) => ({
    stores: getSelectStoreList(state)
  }),
  { setStoreCode })(SelectStorePage);
