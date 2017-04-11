import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import {getStoreId} from '../reducers/selectors';
import {replace} from 'react-router-redux';

export default function(WrappedComponent) {
  class verifyStoreId extends Component {
    componentWillMount() {
      console.log('in verifStoreId');
      if (!this.props.storeId) {
        this.props.replace('/initialization');
      }
    }
    
    render() {
      if(!this.props.storeId) {
        return null
      }
      
      return <WrappedComponent {...this.state} {...this.props}/>
    }
  }
  
  const mapStateToProps = (state) => {
    return {storeId: getStoreId(state)}
  };
  
  const connected = connect(mapStateToProps, {replace})(verifyStoreId);
  return hoistStatics(connected, WrappedComponent);
}
