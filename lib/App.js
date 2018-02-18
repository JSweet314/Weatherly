import React from 'react';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import Data from '../public/Data.js';
import "./stylesheets/App.scss";

const App = () => {
  return (
    <div className="app">
      <CurrentWeather currentObservation={Data.current_observation} forecast={Data.forecast} />
      <SevenHourForecast hourlyForecast={Data.hourly_forecast}/>
      <TenDayForecast />
    </div>
  );
};

module.exports = App;