import React from 'react';
import moment from 'moment';
import './stylesheets/CurrentWeather.scss';

const CurrentWeather = (props) => {
  let displayLocation = props.data.current_observation.display_location.full;
  let date = moment().format('MMM. Do, YYYY');
  let currentTemp = props.data.current_observation.temperature_string;
  let highTemp = props.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  let lowTemp = props.data.forecast.simpleforecast.forecastday[0].low.fahrenheit;

  return (
    <section className="current-weather">
      <div className="current-weather__wrapper">
        <h3 className="current-weather__city">{displayLocation}</h3>
        <h2 className="current-weather__date">{date}</h2>
        <div className="current-weather__low">
          <img src="" alt="" />
          <p>LOW: {lowTemp}°F</p>
        </div>
        <h1 className="current-weather__temp">{currentTemp}</h1>
        <div className="current-weather__high">
          <img src="" alt="" />
          <p>HIGH: {highTemp}°F</p>
        </div>
        <img className="current-weather__img" src="" alt="Current Weather Image" />
        <p className="current-weather__description">A Short Description</p>
      </div>
    </section>
  )
}

module.exports = CurrentWeather;