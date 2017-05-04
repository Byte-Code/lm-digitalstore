import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import mountWithStore from '../../app/utils/testingUtils';
import Home from '../../app/components/Home';
import World from '../../mocks/world';

describe('Home', () => {
  const requestFetchWorld = jest.fn();

  it('should render null if world is empty', () => {
    const emptyWorld = fromJS({});
    const result = shallow(
      <Home
        world={emptyWorld}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly if world is not empty', () => {
    const result = shallow(
      <Home
        world={fromJS(World)}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchWorld after mount', () => {
    mountWithStore(
      <Home
        world={fromJS(World)}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(requestFetchWorld).toHaveBeenCalled();
  });
});
