import React from 'react';
import './stylesheets/Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="card">
        <p className="card__hour">{this.props.hour.FCTTIME.civil}</p>
        <img className="card__img" src={this.props.hour.icon_url} alt={this.props.hour.icon} />
        <p className="card__temp">{this.props.hour.temp.english}°F</p>
      </article>
    )
  }
}

module.exports = Card;