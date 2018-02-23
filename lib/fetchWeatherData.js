import {apiKey} from '../private/apiKey.js';
const root = 'http://api.wunderground.com/api';

const fetchWeatherData = (city, state) => {
  return fetch(`${root}/${apiKey}/conditions/hourly/forecast10day/q/` +
  `${state}/${city}.json`);
};

export default fetchWeatherData;