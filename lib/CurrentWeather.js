import React from 'react';
import moment from 'moment';
import './stylesheets/CurrentWeather.scss';

const CurrentWeather = (props) => {
  let displayLocation = props.data.current_observation.display_location.full;
  let date = moment().format('MMM. Do, YYYY');

  return (
    <section className="current-weather">
      <h3 className="current-weather__city">{displayLocation}</h3>
      <h2 className="current-weather__date">{date}</h2>
      <div className="current-weather__low">
        <img src="" alt="" />
        <p>LOW</p>
      </div>
      <h1 className="current-weather__temp">80°</h1>
      <div className="current-weather__high">
        <img src="" alt="" />
        <p>HIGH</p>
      </div>
      <img className="current-weather__img" src="" alt="Current Weather Image" />
      <p className="current-weather__description">A Short Description</p>
    </section>
  )
}

module.exports = CurrentWeather;