import React from "react";
import Card from './Card';
import PropTypes from 'prop-types';
import "./stylesheets/TenDayForecast.scss";

const TenDayForecast = ({tenDay}) => {
  return (
    <section className="ten-day">
    {
      tenDay.map((day, index) => {
        return <Card key={index} data={day} style={{flexDirection: 'column'}}/>;
      })
    }
    </section>
  );
};

TenDayForecast.propTypes = {
  tenDay: PropTypes.array.isRequired
};

module.exports = TenDayForecast;