import React, { Component } from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

const defaultTitleStyle = {
  fontSize: '48px',
  textAlign: 'center',
  marginBottom: '13px'
};

const defaultSubTitleStyle = {
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Light-Italic',
  textAlign: 'center',
  marginBottom: '57px'
};

export default class HOTabContainer extends Component {
  constructor(props) {
    super(props);
    this.titleStyle = Object.assign(defaultTitleStyle, this.props.titleStyle);
    this.subTitleStyle = Object.assign(defaultSubTitleStyle, this.props.subTitleStyle);
  }

  shouldComponentUpdate(nextProps) {
    return !fromJS(nextProps).equals(this.props);
  }

  render() {
    const { title, subTitle, children } = this.props;
    const { titleStyle, subTitleStyle } = this;
    return (
      <div>
        {title && <h1 style={titleStyle}>{title}</h1>}
        {subTitle && <p style={subTitleStyle}>{subTitle}</p>}
        {children}
      </div>
    );
  }
}

HOTabContainer.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  titleStyle: stylePropType,
  subTitleStyle: stylePropType
};

HOTabContainer.defaultProps = {
  title: '',
  subTitle: '',
  titleStyle: defaultTitleStyle,
  subTitleStyle: defaultSubTitleStyle
};
