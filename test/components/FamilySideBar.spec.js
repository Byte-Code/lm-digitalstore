import React from 'react';
import { fromJS } from 'immutable';
import { shallow, mount } from 'enzyme';

import FamilySideBar from '../../app/components/FamilySideBar';

describe('FamilySideBar', () => {
  const requestFetchWorld = jest.fn();
  const push = () => {};
  const closeMenu = () => {};

  it('should render null when world is empty', () => {
    const world = fromJS({});
    const result = shallow(
      <FamilySideBar
        world={world}
        push={push}
        closeMenu={closeMenu}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should render properly when world is not empty', () => {
    const world = fromJS({
      families: [
        {
          familyName: 'name',
          image: 'image',
          categoryCode: 'code'
        }
      ]
    });
    const result = shallow(
      <FamilySideBar
        world={world}
        push={push}
        closeMenu={closeMenu}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('should call requestFetchWorld after mounting', () => {
    const world = fromJS({
      families: [
        {
          familyName: 'name',
          image: 'image',
          categoryCode: 'code'
        }
      ]
    });
    mount(
      <FamilySideBar
        world={world}
        push={push}
        closeMenu={closeMenu}
        requestFetchWorld={requestFetchWorld}
      />
    );
    expect(requestFetchWorld).toHaveBeenCalled();
  });
});
