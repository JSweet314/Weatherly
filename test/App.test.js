import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../lib/App';
import Welcome from '../lib/Welcome';
import Searchbar from '../lib/Searchbar';
import CurrentWeather from '../lib/CurrentWeather';
import SevenHourForecast from '../lib/SevenHourForecast';
import TenDayForecast from '../lib/TenDayForecast';

describe('App - shallow rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a welcome screen by default', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Welcome').length).toEqual(1);
  });

  it('should render the weather components if not the welcome screen', () => {
    wrapper.setState({
      welcome: false
    });

    expect(wrapper.find('Welcome').length).toEqual(0);
    expect(wrapper.find('Searchbar').length).toEqual(1);
    expect(wrapper.find('CurrentWeather').length).toEqual(1);
    expect(wrapper.find('TenDayForecast').length).toEqual(1);
  });

  it('should be able to store city, state, currentObservation, hourlyForecast, tenDayForecast, and booleans for welcome and error in state', () => {
    expect(wrapper.state()).toEqual({
      location: localStorage.getItem('weatherlySearch') || '',
      currentObservation: {},
      hourlyForecast: [],
      tenDayForecast: [],
      welcome: true,
      error: false
    });
  });
});

describe('App - mounted rendering', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('weatherlySearch', 'Denver, CO');
    wrapper = mount(<App />);
  });

  it('should be able to retrieve the last search value from localStorage', () => {
    let search = wrapper.find('Searchbar');
    
    expect(wrapper.state('location')).toEqual('Denver, CO');
    expect(search.props()).toHaveProperty('lastSearch', 'Denver, CO')
  });
})