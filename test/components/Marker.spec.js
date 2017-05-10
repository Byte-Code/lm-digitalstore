import React from 'react';
import { shallow } from 'enzyme';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import MyPlaceIcon from 'material-ui/svg-icons/maps/person-pin-circle';

import Marker, { Wrapper } from '../../app/components/Marker';

const handleClick = jest.fn();

describe('Marker', () => {
  it('should render with a PlaceIcon if isCurrentStore is false', () => {
    const wrapper = shallow(
      <Marker
        handleClick={handleClick}
        isCurrentStore={false}
        isAvailable={false}
      />
    );
    expect(wrapper.find(PlaceIcon)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with a MyPlaceIcon if isCurrentStore is true', () => {
    const wrapper = shallow(
      <Marker
        handleClick={handleClick}
        isCurrentStore
        isAvailable={false}
      />
    );
    expect(wrapper.find(MyPlaceIcon)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a black icon if isAvailable is false', () => {
    const wrapper = shallow(
      <Marker
        handleClick={handleClick}
        isCurrentStore={false}
        isAvailable={false}
      />
    );
    expect(wrapper.find(PlaceIcon).prop('color')).toEqual('#000');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a green icon if isAvailable is false', () => {
    const wrapper = shallow(
      <Marker
        handleClick={handleClick}
        isCurrentStore={false}
        isAvailable
      />
    );
    expect(wrapper.find(PlaceIcon).prop('color')).toEqual('#67cb33');
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClick when clicked', () => {
    const wrapper = shallow(
      <Marker
        handleClick={handleClick}
        isCurrentStore={false}
        isAvailable
      />
    );
    wrapper.find(Wrapper).simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
