import React, { PropTypes } from 'react';
import Slider from 'react-slick';

const settings = {
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  speed: 100,
};

const ProductSlider = ({ children }) => (
  <div style={{ width: 1000, margin: 'auto' }}>
    <Slider {...settings}>
      {children}
    </Slider>
  </div>

);


ProductSlider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductSlider;
