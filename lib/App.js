import React from 'react';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import Data from '../public/Data.js';
import "./stylesheets/App.scss";

const App = () => {
  return (
    <div className="app">
      <CurrentWeather data={Data} />
      <TenDayForecast />
      <SevenHourForecast />
    </div>
  );
};

module.exports = App;