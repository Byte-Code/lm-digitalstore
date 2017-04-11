import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import {getStoreId} from '../reducers/selectors';
import {replace} from 'react-router-redux';

export default function(WrappedComponent) {
  class verifyStoreId extends Component {
    componentWillMount() {
      if (!this.props.storeId) {
        this.props.replace('/initialization');
      }
    }
    
    render() {
      console.log(this.props.storeId)
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
