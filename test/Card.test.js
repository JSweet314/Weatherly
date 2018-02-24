import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '../lib/Card';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card key={0} data={{}} style={{}} />);
  });

  it('should render our good friend Card', () => {
    expect(wrapper).not.toBeNull;
    expect(wrapper.find('p.card__date-time')).toBeDefined;
    expect(wrapper.find('img.card__img')).toBeDefined;
    expect(wrapper.find('p.card__data')).toBeDefined;
  });

  it('should have a data prop', () => {
    expect(wrapper.props('data')).toBeDefined;
  });

  it('should have a style prop', () => {
    expect(wrapper.props('style')).toBeDefined;
  });
});

