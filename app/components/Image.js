import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import ImageZoom from 'react-medium-image-zoom';

import getUrl from '../utils/cloudinary';

const Img = glamorous.img({
  backgroundColor: '#fff'
});

export default class Image extends Component {
  static propTypes = {
    imageID: PropTypes.string.isRequired,
    fixBrightColor: PropTypes.bool,
    alt: PropTypes.string.isRequired,
    imageOptions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    zoomable: PropTypes.bool
  };

  static defaultProps = {
    imageOptions: {},
    fixBrightColor: false,
    zoomable: false
  };

  render() {
    const { imageID, alt, imageOptions, fixBrightColor, zoomable } = this.props;
    const overlayZoomStyle = { overlay: { opacity: 0.7 } };
    let options = { ...imageOptions };
    if (fixBrightColor) {
      options = {
        ...options,
        dpr: 'auto',
        fetch_format: 'auto',
        flags: ['lossy']
      };
    }
    const src = getUrl(imageID, options);

    return zoomable ?
      <ImageZoom defaultStyles={overlayZoomStyle} image={{ src, alt }} zoomImage={{ src, alt }} /> :
      <Img src={src} alt={alt} />;
  }
}
