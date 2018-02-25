import weatherDataWrangler from '../lib/weatherDataWrangler';
import {data} from '../public/Data';
import moment from 'moment';

describe('weatherDataWrangler', () => {
  it('should return an object of data for the current forecast', () => {
    let result = weatherDataWrangler(data, 'currentObservation');

    expect(result).toEqual({
      displayLocation: data.current_observation.display_location.full,
      date: moment.unix(data.current_observation.local_epoch).format(`dddd 
      MMM. DD, YYYY`),
      currentTemp: data.current_observation.temp_f + '°F',
      high: data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
      low: data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
      description: data.forecast.txt_forecast.forecastday[0].fcttext,
      currentIcon: data.current_observation.icon_url
    });
  });

  it('should return an array of data for the hourly forecast', () => {
    let result = weatherDataWrangler(data, 'hourlyForecast');
    const sevenHours = data.hourly_forecast.slice(0, 7);
    
    expect(result).toEqual(
      sevenHours.map(hour => {
        hour.icon_url = hour.icon_url.slice(0, 26) + 'i' + 
        hour.icon_url.slice(27);
        return {
          dateTime: hour.FCTTIME.civil,
          iconURL: hour.icon_url,
          iconAlt: hour.icon,
          temp: hour.temp.english + '°F'
        };
      })
    );
  });

  it('should return an array of data for the ten day forecast', () => {
    let result = weatherDataWrangler(data, 'tenDayForecast');

    expect(result).toEqual(
      data.forecast.simpleforecast.forecastday.map(day => {
        day.icon_url = day.icon_url.slice(0, 26) + 'i' + day.icon_url.slice(27);
        return {
          dateTime: day.date.weekday_short,
          iconAlt: day.icon,
          iconURL: day.icon_url,
          temp: `High: ${day.high.fahrenheit}°F Low: ${day.low.fahrenheit}°F`
        };
      })
    );
  });
});