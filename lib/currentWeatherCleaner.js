import moment from 'moment';

const currentWeatherCleaner = (data) => {
  return {
    displayLocation: data.current_observation.display_location.full,
    date: moment.unix(data.current_observation.local_epoch).format('dddd MMM. DD, YYYY'),
    currentTemp: data.current_observation.temp_f,
    high: data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
    low: data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
    description: data.forecast.txt_forecast.forecastday[0].fcttext,
    currentIcon: data.current_observation.icon_url
  }
};

export default currentWeatherCleaner;