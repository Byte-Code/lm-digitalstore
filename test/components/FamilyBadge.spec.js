import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import FamilyBadge, { Wrapper, ImageWrapper } from '../../app/components/FamilyBadge';

describe('FamilyBadge', () => {
  const family = fromJS({
    familyName: 'family',
    image: 'image',
    categoryCode: '123'
  });

  it('case square-big: should render with the right height and width', () => {
    const squareBig = shallow(
      <FamilyBadge family={family} size="square-big" />
    );
    expect(squareBig.find(Wrapper).prop('width')).toEqual(490);
    expect(squareBig.find(ImageWrapper).prop('height')).toEqual(561);
    expect(squareBig).toMatchSnapshot();
  });

  it('case square-small: should render with the right height and width', () => {
    const squareSmall = shallow(
      <FamilyBadge family={family} size="square-small" />
    );
    expect(squareSmall.find(Wrapper).prop('width')).toEqual(235);
    expect(squareSmall.find(ImageWrapper).prop('height')).toEqual(235);
    expect(squareSmall).toMatchSnapshot();
  });


  it('case horizontal: should render with the right height and width', () => {
    const horizontal = shallow(
      <FamilyBadge family={family} size="horizontal" />
    );
    expect(horizontal.find(Wrapper).prop('width')).toEqual(490);
    expect(horizontal.find(ImageWrapper).prop('height')).toEqual(235);
    expect(horizontal).toMatchSnapshot();
  });


  it('case wrong prop: should render with default height and width', () => {
    const defaultSize = shallow(
      <FamilyBadge family={family} size="defualt" />
    );
    expect(defaultSize.find(Wrapper).prop('width')).toEqual(490);
    expect(defaultSize.find(ImageWrapper).prop('height')).toEqual(235);
    expect(defaultSize).toMatchSnapshot();
  });
});
