import React from "react";
import Card from './Card';
import "./stylesheets/TenDayForecast.scss";

const TenDayForecast = (props) => {
  return (
    <section className="ten-day">
    {
      props.tenDay.map((day, index) => {
        return <Card key={index} data={day} />
      })
    }
    </section>
  );
};

module.exports = TenDayForecast;