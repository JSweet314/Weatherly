import React, {Component} from "react";
import Card from './Card.js';
import "./stylesheets/SevenHourForecast";

class SevenHourForecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="seven-hour">
        <button className="seven-hour__menu-btn"></button>
        <p className="seven-hour__title">7 HOUR FORECAST</p>
        {
          this.props.hourlyForecast.map((hour, index) => {
            if (index < 7) {
              return <Card key={index} hour={hour}/>;
            }
          })
        }
      </section>
    );
  }
}

module.exports = SevenHourForecast;