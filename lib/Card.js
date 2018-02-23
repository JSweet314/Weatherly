import React from 'react';
import PropTypes from 'prop-types';
import './stylesheets/Card.scss';

export default function Card({style, data}) {
  return (
    <article className="card" style={style}>
      <p className="card__date-time">{data.dateTime}</p>
      <img className="card__img"
            src={data.iconURL}
            alt={data.iconAlt} />
      <p className="card__data">{data.temp}</p>
    </article>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  style: PropTypes.object
};