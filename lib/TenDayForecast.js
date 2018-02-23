import React from "react";
import Card from './Card';
import PropTypes from 'prop-types';
import "./stylesheets/TenDayForecast.scss";

export default function TenDayForecast({tenDayForecast}) {
  return (
    <section className="ten-day">
    {
      tenDayForecast.map((day, index) => {
        if (index === 0) {
          day.dateTime = 'Today';
        }
        return <Card key={index} data={day} style={{flexDirection: 'column'}}/>;
      })
    }
    </section>
  );
}

TenDayForecast.propTypes = {
  tenDayForecast: PropTypes.array.isRequired
};