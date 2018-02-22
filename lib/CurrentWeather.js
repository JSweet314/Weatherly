import React from 'react';

import './stylesheets/CurrentWeather.scss';

const CurrentWeather = (props) => {
  return ( 
    <section className="current-weather">
      <h3 className="current-weather__city">
        {props.currentObservation.displayLocation}
      </h3>
      <h2 className="current-weather__date">{props.currentObservation.date}</h2>
      <div className="current-weather__data">
        <p className="current-weather__low">LOW<br/>
          {props.currentObservation.low}°F
        </p>
        <h1 className="current-weather__temp">
          {props.currentObservation.currentTemp}
        </h1>
        <p className="current-weather__high">HIGH<br />
          {props.currentObservation.high}°F
        </p>
      </div>
      <img
        className="current-weather__img"
        src={props.currentObservation.currentIcon} alt="Current Weather Image" 
      />
      <p className="current-weather__description">
        {props.currentObservation.description}
      </p>
    </section>
  );
};

module.exports = CurrentWeather;