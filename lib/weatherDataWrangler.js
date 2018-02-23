import moment from 'moment';

const weatherDataWrangler = (data, dataName) => {
  const sevenHours = data.hourly_forecast.splice(0, 7);
  
  switch (dataName) {
  case 'currentObservation':
    return {
      displayLocation: data.current_observation.display_location.full,
      date: moment.unix(data.current_observation.local_epoch).format(`dddd 
      MMM. DD, YYYY`),
      currentTemp: data.current_observation.temp_f + '°F',
      high: data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
      low: data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
      description: data.forecast.txt_forecast.forecastday[0].fcttext,
      currentIcon: data.current_observation.icon_url
    };
  
  case 'hourlyForecast':
    return sevenHours.map(hour => {
      return {
        dateTime: hour.FCTTIME.civil,
        iconURL: hour.icon_url,
        iconAlt: hour.icon,
        temp: hour.temp.english + '°F'
      };
    });
    
  case 'tenDayForecast':
    return data.forecast.simpleforecast.forecastday.map(day => {
      return {
        dateTime: day.date.weekday_short,
        iconAlt: day.icon,
        iconURL: day.icon_url,
        temp: `High: ${day.high.fahrenheit}°F Low: ${day.low.fahrenheit}°F`
      };
    });
  
  default:
    break;
  }
};

export default weatherDataWrangler;