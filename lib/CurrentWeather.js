import React from 'react';
import PropTypes from 'prop-types';
import './stylesheets/CurrentWeather.scss';

const CurrentWeather = ({currentObservation}) => {
  return ( 
    <section className="current-weather">
      
      <div className="current-weather__card">
        <h3 className="current-weather__city">
          {currentObservation.displayLocation}
        </h3>
        <h2 className="current-weather__date">{currentObservation.date}</h2>
        <div className="current-weather__data">
          <p className="current-weather__low">LOW<br/>
          {currentObservation.low}°F
          </p>
          <h1 className="current-weather__temp">
            {currentObservation.currentTemp}
          </h1>
          <p className="current-weather__high">HIGH<br />
            {currentObservation.high}°F
          </p>
        </div>
        <img
        className="current-weather__img"
        src={currentObservation.currentIcon}
        alt="Current Weather Image" 
        />
        <p className="current-weather__description">
          {currentObservation.description}
        </p>
      </div>
    </section>
  );
};

CurrentWeather.propTypes = {
  currentObservation: PropTypes.object.isRequired
};

export default CurrentWeather;