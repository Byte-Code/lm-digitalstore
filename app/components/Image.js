import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactImageZoom from 'react-image-zoom';

import getUrl from '../utils/cloudinary';

export default class Image extends Component {
  static propTypes = {
    imageID: PropTypes.string.isRequired,
    fixBrightColor: PropTypes.bool,
    imageOptions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    })
  };

  static defaultProps = {
    imageOptions: {},
    fixBrightColor: false
  };

  render() {
    const { imageID, imageOptions, fixBrightColor } = this.props;
    let options = { ...imageOptions };
    if (fixBrightColor) {
      options = {
        ...options,
        dpr: 'auto',
        fetch_format: 'auto',
        flags: ['lossy']
      };
    }
    const url = getUrl(imageID, options);

    const props = { width: 800, height: 800, zoomWidth: 500, img: url };

    return <ReactImageZoom {...props} />;
  }
}
