import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import ImageSlider from '../../app/components/ImageSlider';

describe('ImageSlider', () => {
  const imageOptions = { width: 100, height: 100 };
  const alt = 'alt';

  it('should not render the slick if only one image is present', () => {
    const imageIDList = fromJS(['image0']);
    const result = shallow(
      <ImageSlider
        imageOptions={imageOptions}
        alt={alt}
        imageIDList={imageIDList}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a slick carousel when multiple images are present', () => {
    const imageIDList = fromJS(['image0', 'image1', 'image2']);
    const result = shallow(
      <ImageSlider
        imageOptions={imageOptions}
        alt={alt}
        imageIDList={imageIDList}
      />
    );
    expect(result).toMatchSnapshot();
  });
});
