import React, { Component, PropTypes } from 'react';
import glamorous from 'glamorous';

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
    })
  };

  static defaultProps = {
    imageOptions: {},
    fixBrightColor: false
  };

  render() {
    const { imageID, alt, imageOptions, fixBrightColor } = this.props;
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

    return (
      <Img
        src={url}
        alt={alt}
      />
    );
  }
}
