import React, {Component} from 'react';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import {fetchWeatherData} from './fetchWeatherData';
import currentWeatherCleaner from './currentWeatherCleaner';
import hourlyWeatherCleaner from './hourlyWeatherCleaner';
import Data from '../public/Data.js';
import "./stylesheets/App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state ={
      city: '',
      state: '',
      currentObservation: {},
      hourlyForecast: [],
      forecast: {}
    }
  }

  componentDidMount() {
    fetchWeatherData('CO', 'Denver')
      .then(response => response.json())
      .then(data => this.setState({
        currentObservation: currentWeatherCleaner(data),
        hourlyForecast: hourlyWeatherCleaner(data),
        forecast: data.forecast
      }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        {
        this.state.currentObservation && <CurrentWeather 
            currentObservation={this.state.currentObservation}
          />
        }
        {
          this.state.hourlyForecast && <SevenHourForecast hourlyForecast={this.state.hourlyForecast}/>
        }
        <TenDayForecast />
      </div>
    );
  }
}