import React, { Component, PropTypes } from 'react';

export default class Catalogue extends Component {
  static propTypes = {
    params: PropTypes.shape({ categoryCode: PropTypes.string.isRequired }).isRequired,
    requestFetchCategory: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {
      params: { categoryCode },
      requestFetchCategory
    } = this.props;
    requestFetchCategory(categoryCode);
  }

  render() {
    return (
      <div>
        {this.props.params.categoryCode}
      </div>
    );
  }
}
