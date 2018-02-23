import React from "react";
import Card from './Card';
import PropTypes from 'prop-types';
import "./stylesheets/TenDayForecast.scss";

const TenDayForecast = ({tenDayForecast}) => {
  return (
    <section className="ten-day">
    {
      tenDayForecast.map((day, index) => {
        return <Card key={index} data={day} style={{flexDirection: 'column'}}/>;
      })
    }
    </section>
  );
};

TenDayForecast.propTypes = {
  tenDayForecast: PropTypes.array.isRequired
};

module.exports = TenDayForecast;