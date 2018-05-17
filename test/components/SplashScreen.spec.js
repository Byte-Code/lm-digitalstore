import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map, fromJS } from 'immutable';

import SplashScreen from '../../app/components/SplashScreen';

const world = fromJS({ screenSaverVideo: 'theVideoUrl' });
const requestFetchWorld = jest.fn();


describe('SplashScreen', () => {
  it('should return null when world is null is empty', () => {
    const result = shallow(
      <SplashScreen
        requestFetchWorld={requestFetchWorld}
        world={Map()}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should otherwise render properly', () => {
    const result = shallow(
      <SplashScreen
        world={world}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchWorld after mounting', () => {
    mount(
      <SplashScreen
        world={world}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(requestFetchWorld).toHaveBeenCalled();
  });
});
