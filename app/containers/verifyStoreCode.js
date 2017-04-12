import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import {getStoreCode} from '../reducers/selectors';
import {replace} from 'react-router-redux';

export default function(WrappedComponent) {
  class verifystoreCode extends Component {
    componentWillMount() {
      if (!this.props.storeCode) {
        this.props.replace('/initialization');
      }
    }
    
    render() {
      console.log(this.props.storeCode)
      if(!this.props.storeCode) {
        return null
      }
      
      return <WrappedComponent {...this.state} {...this.props}/>
    }
  }
  
  const mapStateToProps = (state) => {
    return {storeCode: getStoreCode(state)}
  };
  
  const connected = connect(mapStateToProps, {replace})(verifystoreCode);
  return hoistStatics(connected, WrappedComponent);
}
