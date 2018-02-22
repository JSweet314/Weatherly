const root = 'http://www.wunderground.com/api';
import {apiKey} from '../private/apiKey.js';

const fetchWeatherData = (city, state) => {
  return fetch(`http://api.wunderground.com/api/${apiKey}/geolookup/conditions/hourly/forecast10day/q/${state}/${city}.json`);
};

export {
  fetchWeatherData
};