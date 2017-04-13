import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Slider from 'react-slick';

import Image from './Image';

const settings = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 100,
  arrows: false,
  dots: true,
  dotsClass: 'slickDots'
};

export default class ImageSlider extends Component {
  static propTypes = {
    imageIDList: ImmutablePropTypes.list.isRequired,
    imageOptions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }).isRequired,
    alt: PropTypes.string.isRequired
  }

  renderImages() {
    const { imageIDList, imageOptions, alt } = this.props;

    return imageIDList.map(imageID => (
      <div key={imageID}>
        <Image
          fixBrightColor
          imageID={imageID}
          imageOptions={imageOptions}
          alt={alt}
        />
      </div>
    ));
  }

  render() {
    return (
      <Slider {...settings}>
        {this.renderImages()}
      </Slider>
    );
  }
}
