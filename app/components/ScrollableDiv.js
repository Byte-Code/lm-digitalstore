import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

/* @dev Toggle function during scrolling
 * @param scrollTopValue - control value when trigger onOverThreshold / onBelowThrashold
 * @param onOverThreshold - callBack when scroll >= scrollTopValue
 * @param onBelowThrashold - callBack ofter onOverThreshold when scroll < scrollTopValue
 * @params onScrolling - callBack when scrolling
 */
export default class ScrollableDiv extends Component {
  static propTypes = {
    children: PropTypes.node,
    scrollTopValue: PropTypes.number,
    onOverThreshold: PropTypes.func,
    onBelowThrashold: PropTypes.func,
    onScrolling: PropTypes.func
  };

  static defaultProps = {
    children: [],
    scrollTopValue: 0,
    onOverThreshold: () => {},
    onBelowThrashold: () => {},
    onScrolling: () => {}
  };

  constructor(props) {
    super(props);
    this.scrollTop = 0;
    this.handleScroll = this.handleScroll.bind(this);
    this.setScrollTop = this.setScrollTop.bind(this);
    this.checkThreshold = this.checkThreshold.bind(this);
    this.triggerThreshold = this.triggerThreshold.bind(this);
  }

  state = {
    handled: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUpdate(nextProps, nextState) {
    const stateChanged = !fromJS(nextState).equals(fromJS(this.state));
    if (stateChanged) {
      this.triggerThreshold(nextState);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setScrollTop(scrollTop) {
    this.scrollTop = scrollTop;
  }

  getScrollTop() {
    return this.scrollTop;
  }

  triggerThreshold(nextState) {
    return nextState.handled
      ? this.props.onOverThreshold()
      : this.props.onBelowThrashold();
  }

  checkThreshold() {
    const isOverLimit = this.getScrollTop() >= this.props.scrollTopValue;
    const triggerIsOver = isOverLimit && !this.state.handled;
    const triggerIsNotOver = !isOverLimit && this.state.handled;

    if (triggerIsOver || triggerIsNotOver) {
      this.setState({ handled: !this.state.handled });
    }
  }

  handleScroll(event) {
    const { srcElement: { body: { scrollTop = 0 } = {} } = {} } = event;
    this.setScrollTop(scrollTop);
    this.checkThreshold();

    return this.props.onScrolling(this.scrollTop);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
