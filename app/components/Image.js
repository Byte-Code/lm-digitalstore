import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import getUrl from '../utils/cloudinary';

const Img = styled.img`
  background-color: #fff;
`;

export default class Image extends Component {
  static propTypes = {
    imageID: PropTypes.string.isRequired,
    fixBrightColor: PropTypes.bool,
    alt: PropTypes.string.isRequired,
    imageOptions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    })
  }

  static defaultProps = {
    imageOptions: {},
    fixBrightColor: false
  }

  render() {
    const { imageID, alt, imageOptions, fixBrightColor } = this.props;
    let options = { ...imageOptions };
    if (fixBrightColor) {
      options = {
        ...options,
        crop: 'fit',
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
