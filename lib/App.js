import React from 'react';
import CurrentWeather from './CurrentWeather';
import Data from '../public/Data.js';

const App = () => {
  return (
    <CurrentWeather data={Data} />
  );
};

module.exports = App;