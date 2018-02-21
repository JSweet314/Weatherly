import React from 'react';
import PropTypes from 'prop-types';
import './stylesheets/Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <article className="card">
        <p className="card__date-time">{this.props.hour.time}</p>
        <img className="card__img"
              src={this.props.hour.iconURL}
              alt={this.props.hour.iconAlt} />
        <p className="card__data">{this.props.hour.temp}°F</p>
      </article>
    );
  }
}

Card.propTypes = {
  hour: PropTypes.object.isRequired
};

module.exports = Card;