import React from 'react';
import {shallow, mount} from 'enzyme';
import TenDayForecast from '../lib/TenDayForecast';
import Card from '../lib/Card';

describe('TenDayForecast', () => {
  let wrapper;
  const mockData = [
      { "dateTime": "Sat", "iconAlt": "partlycloudy", "iconURL": "http://icons.wxug.com/i/c/k/partlycloudy.gif", "temp": "High: 34°F Low: 15°F" },
      { "dateTime": "Sun", "iconAlt": "partlycloudy", "iconURL": "http://icons.wxug.com/i/c/k/partlycloudy.gif", "temp": "High: 39°F Low: 20°F" },
      { "dateTime": "Mon", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 44°F Low: 18°F" },
      { "dateTime": "Tue", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 44°F Low: 21°F" },
      { "dateTime": "Wed", "iconAlt": "partlycloudy", "iconURL": "http://icons.wxug.com/i/c/k/partlycloudy.gif", "temp": "High: 41°F Low: 20°F" },
      { "dateTime": "Thu", "iconAlt": "partlycloudy", "iconURL": "http://icons.wxug.com/i/c/k/partlycloudy.gif", "temp": "High: 47°F Low: 27°F" },
      { "dateTime": "Fri", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 51°F Low: 30°F" },
      { "dateTime": "Sat", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 52°F Low: 27°F" },
      { "dateTime": "Sun", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 44°F Low: 25°F" },
      { "dateTime": "Mon", "iconAlt": "clear", "iconURL": "http://icons.wxug.com/i/c/k/clear.gif", "temp": "High: 46°F Low: 26°F" }
  ];
  
  beforeEach(() => {
    wrapper = shallow(<TenDayForecast tenDayForecast={mockData} />);
  })

  it('should have a prop tenDayForecast, an array', () => {
    expect(Array.isArray(wrapper.props.tenDayForecast)).toEqual(true);
  })
  
  it('should render our good friend, TenDayForecast', () => {
    expect(wrapper).not.toBeNull;
    mockData.forEach((day, index) => {
      expect(wrapper.contains(
        <Card key={index} data={day} style={{ flexDirection: 'column' }} />
      )).toEqual(true);
    });
  });


});