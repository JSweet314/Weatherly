import React from 'react';
import { shallow, mount } from 'enzyme';
import SevenHourForecast from '../lib/SevenHourForecast';
import Card from '../lib/Card';

describe('SevenHourForecast', () => {
  let wrapper;

  const mockData = [{"dateTime":"2:00 AM","iconURL":"http://icons.wxug.com/i/c/k/nt_cloudy.gif","iconAlt":"cloudy","temp":"40°F"},{"dateTime":"3:00 AM","iconURL":"http://icons.wxug.com/i/c/k/nt_cloudy.gif","iconAlt":"cloudy","temp":"42°F"},{"dateTime":"4:00 AM","iconURL":"http://icons.wxug.com/i/c/k/nt_cloudy.gif","iconAlt":"cloudy","temp":"42°F"},{"dateTime":"5:00 AM","iconURL":"http://icons.wxug.com/i/c/k/nt_cloudy.gif","iconAlt":"cloudy","temp":"43°F"},{"dateTime":"6:00 AM","iconURL":"http://icons.wxug.com/i/c/k/nt_mostlycloudy.gif","iconAlt":"mostlycloudy","temp":"43°F"},{"dateTime":"7:00 AM","iconURL":"http://icons.wxug.com/i/c/k/mostlycloudy.gif","iconAlt":"mostlycloudy","temp":"43°F"},{"dateTime":"8:00 AM","iconURL":"http://icons.wxug.com/i/c/k/partlycloudy.gif","iconAlt":"partlycloudy","temp":"45°F"}]

  beforeEach(() => {
    wrapper = shallow(<SevenHourForecast hourlyForecast={mockData} />);
  })

  it('should render our good friend SevenHourForecast', () => {
    expect(wrapper).not.toBeNull;
    mockData.forEach((hour, index) => {
      expect(wrapper.contains(
        <Card key={index} data={hour} style={{}} />
      )).toEqual(true);
    });
  })

  it('should have a prop of hourlyForecast', () => {
    expect(wrapper.props.hourlyForecast).toBeDefined;
  })
})