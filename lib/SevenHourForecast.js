import React from "react";
import Card from './Card.js';
import PropTypes from 'prop-types';
import "./stylesheets/SevenHourForecast.scss";

const SevenHourForecast = ({hourlyForecast}) => {
  return (
    <section className="seven-hour">
      <h2 className="seven-hour__title">7 HOUR FORECAST</h2>
      {
        hourlyForecast.map((hour, index) => {
          return <Card key={index} data={hour} style={{}}/>;
        })
      }
    </section>
  );
};

SevenHourForecast.propTypes = {
  hourlyForecast: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SevenHourForecast;