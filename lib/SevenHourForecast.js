import React, {Component} from "react";
import Card from './Card.js';
import "./stylesheets/SevenHourForecast";

export default function SevenHourForecast({hourlyForecast}) {

  return (
    <section className="seven-hour">
      <h2 className="seven-hour__title">7 HOUR FORECAST</h2>
      {
        hourlyForecast.map((hour, index) => {
          return <Card key={index} data={hour} />;
        })
      }
    </section>
  );
}

module.exports = SevenHourForecast;