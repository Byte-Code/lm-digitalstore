import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const settings = {
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  speed: 100,
  arrows: false
};

const Wrapper = styled.div`
  margin-left: 40px;
`;

const ProductSlider = ({ children }) => (
  <Wrapper>
    <Slider {...settings}>
      {children}
    </Slider>
  </Wrapper>

);


ProductSlider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductSlider;
