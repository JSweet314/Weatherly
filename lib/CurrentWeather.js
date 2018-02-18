import React from 'react';
import moment from 'moment';
import './stylesheets/CurrentWeather.scss';

const CurrentWeather = (props) => {
  let displayLocation = props.currentObservation.display_location.full;
  let date = moment.unix(props.forecast.simpleforecast.forecastday[0].date.epoch).format('dddd MMM. DD, YYYY');
  let currentTemp = props.currentObservation.temperature_string;
  let highTemp = props.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  let lowTemp = props.forecast.simpleforecast.forecastday[0].low.fahrenheit;
  let currentDescription = props.forecast.txt_forecast.forecastday[0].fcttext;
  let currentIcon = props.currentObservation.icon_url;

  return (
    <section className="current-weather">
      <h3 className="current-weather__city">{displayLocation}</h3>
      <h2 className="current-weather__date">{date}</h2>
      <div className="current-weather__data">
        <p className="current-weather__low">LOW<br/>{lowTemp}°F</p>
        <h1 className="current-weather__temp">{currentTemp}</h1>
        <p className="current-weather__high">HIGH<br/>{highTemp}°F</p>
      </div>
      <img className="current-weather__img" src={currentIcon} alt="Current Weather Image" />
      <p className="current-weather__description">{currentDescription}</p>
    </section>
  )
}

module.exports = CurrentWeather;