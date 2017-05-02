import React from 'react';
import { shallow } from 'enzyme';
import BlockIcon from 'material-ui/svg-icons/navigation/close';

import CloseButton from '../../app/components/CloseButton';

describe('CloseButton', () => {
  const handleClick = jest.fn();

  it('should render properly when no styles are provided', () => {
    const result = shallow(
      <CloseButton handleClick={handleClick} />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly when styles are provided', () => {
    const result = shallow(
      <CloseButton
        handleClick={handleClick}
        top={10}
        right={10}
        fill="#fff"
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call handleClick when tbe Icon is clicked', () => {
    const result = shallow(
      <CloseButton handleClick={handleClick} />
    );
    result.find(BlockIcon).simulate('touchTap');
    expect(handleClick).toHaveBeenCalled();
  });
});
