import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import getUrl from '../utils/cloudinary';

const Img = styled.img`
  background-color: #fff;
`;

export default class Image extends Component {
  static propTypes = {
    imageID: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    imageOptions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    })
  }

  static defaultProps = {
    imageOptions: {}
  }

  render() {
    const { imageID, alt, imageOptions } = this.props;
    const url = getUrl(imageID, imageOptions);

    return (
      <Img
        src={url}
        alt={alt}
      />
    );
  }
}
