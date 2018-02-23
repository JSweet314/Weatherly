import React from 'react';
import PropTypes from 'prop-types';
import './stylesheets/Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article className="card" style={this.props.style}>
        <p className="card__date-time">{this.props.data.dateTime}</p>
        <img className="card__img"
              src={this.props.data.iconURL}
              alt={this.props.data.iconAlt} />
        <p className="card__data">{this.props.data.temp}</p>
      </article>
    );
  }
}

Card.propTypes = {
  data: PropTypes.object.isRequired
};

module.exports = Card;