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
        <p className="card__date-time">{this.props.hour.FCTTIME.civil}</p>
        <img className="card__img"
              src={this.props.hour.icon_url}
              alt={this.props.hour.icon} />
        <p className="card__data">{this.props.hour.temp.english}°F</p>
      </article>
    );
  }
}

Card.propTypes = {
  hour: PropTypes.object.isRequired
};

module.exports = Card;