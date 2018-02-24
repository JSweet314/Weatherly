import React from 'react';
import { shallow, mount } from 'enzyme';
import CurrentWeather from '../lib/CurrentWeather'

describe('CurrentWeather', () => {
  let wrapper;

  let mockData = {
    displayLocation: 'Denver',
    date: '2am',
    low: '32',
    currentTemp: '70',
    high: '80',
    currentIcon: 'google.com',
    descritption: 'today'
  };

  beforeEach(() => {
    wrapper = shallow(<CurrentWeather currentObservation={mockData} />);
  });

  it('should render our good friend CurrentWeather', () => {
    expect(wrapper).not.toBeNull;
    expect(wrapper.find('div.current-weather__card')).toBeDefined;
    expect(wrapper.find('h3.current-weather__city')).toBeDefined;
    expect(wrapper.find('h2.current-weather__date')).toBeDefined;
    expect(wrapper.find('div.current-weather__data')).toBeDefined;
    expect(wrapper.find('p.current-weather__low')).toBeDefined;
    expect(wrapper.find('h1.current-weather__temp')).toBeDefined;
    expect(wrapper.find('p.current-weather__high')).toBeDefined;
    expect(wrapper.find('img.current-weather__img')).toBeDefined;
    expect(wrapper.find('p.current-weather__description')).toBeDefined;
  });

  it('should have a currentObservation prop', () => {
    expect(wrapper.props.currentObservation).toBeDefined;
  });
}); 