import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../lib/App';
import Welcome from '../lib/Welcome';
import Searchbar from '../lib/Searchbar';
import CurrentWeather from '../lib/CurrentWeather';
import SevenHourForecast from '../lib/SevenHourForecast';
import TenDayForecast from '../lib/TenDayForecast';
import {data} from '../public/Data';
import weatherDataWrangler from '../lib/weatherDataWrangler';

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

    expect(wrapper.find(Welcome).length).toEqual(0);
    expect(wrapper.find(Searchbar).length).toEqual(1);
    expect(wrapper.find(CurrentWeather).length).toEqual(1);
    expect(wrapper.find(SevenHourForecast).length).toEqual(1);
    expect(wrapper.find(TenDayForecast).length).toEqual(1);
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
  const currentObservation = weatherDataWrangler(data, 'currentObservation');
  const hourlyForecast = weatherDataWrangler(data, 'hourlyForecast');
  const tenDayForecast = weatherDataWrangler(data, 'tenDayForecast');
  
  tenDayForecast[0].dateTime = 'Today';

  it('should be able to retrieve the last search value from localStorage', () => {
    localStorage.setItem('weatherlySearch', 'Denver, CO');
    wrapper = mount(<App />);
    expect(wrapper.state('location')).toEqual('Denver, CO');
  });

  it('should have a method handleSearch that updates the state with weather data', () => {
    localStorage.clear();
    wrapper = mount(<App />);
    
    wrapper.instance().update = jest.fn((city, state) => {
      localStorage.setItem('weatherlySearch', city + ', ' + state);

      wrapper.setState({
        currentObservation: weatherDataWrangler(data, 'currentObservation'),
        hourlyForecast: weatherDataWrangler(data, 'hourlyForecast'),
        tenDayForecast: weatherDataWrangler(data, 'tenDayForecast'),
        welcome: false,
        location: city + ', ' + state
      });
    });
  
    wrapper.instance().handleSearch('Denver, CO');

    expect(wrapper.instance().update).toHaveBeenCalled();
    expect(localStorage.getItem('weatherlySearch')).toBeDefined();
    expect(wrapper.state('location')).toEqual('Denver, CO');
    expect(wrapper.state('currentObservation')).toEqual(currentObservation);
    expect(wrapper.state('hourlyForecast')).toEqual(hourlyForecast);
    expect(wrapper.state('tenDayForecast')).toEqual(tenDayForecast);
    expect(wrapper.state('welcome')).toEqual(false);
  });
});