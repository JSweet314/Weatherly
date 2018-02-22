import React, {Component} from 'react';
import Searchbar from './Searchbar';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import {fetchWeatherData} from './fetchWeatherData';
import currentWeatherCleaner from './currentWeatherCleaner';
import hourlyWeatherCleaner from './hourlyWeatherCleaner';
import tenDayCleaner from './tenDayCleaner';
import {data} from '../public/Data';
import "./stylesheets/App";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      currentObservation: currentWeatherCleaner(data),
      hourlyForecast: hourlyWeatherCleaner(data),
      tenDay: tenDayCleaner(data)
    };
  }

  // componentDidMount() {
  //   fetchWeatherData('CO', 'Denver')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       currentObservation: currentWeatherCleaner(data),
  //       hourlyForecast: hourlyWeatherCleaner(data),
  //       tenDay: tenDayCleaner(data)
  //     }))
  //     .catch(error => console.log(error));
  // }

  render() {
    return (
      <div className="app">
        <Searchbar />
        {
          this.state.currentObservation && 
          <CurrentWeather currentObservation={this.state.currentObservation} />
        }
        {
          this.state.hourlyForecast && 
          <SevenHourForecast hourlyForecast={this.state.hourlyForecast} />
        }
        {
          this.state.tenDay && <TenDayForecast tenDay={this.state.tenDay} />
        }
      </div>
    );
  }
}