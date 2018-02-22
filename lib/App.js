import React, {Component} from 'react';
import Searchbar from './Searchbar';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import {fetchWeatherData} from './fetchWeatherData';
import weatherDataWrangler from './weatherDataWrangler';
import {data} from '../public/Data';
import "./stylesheets/App";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      currentObservation: null,
      hourlyForecast: null,
      tenDay: null
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let previousData = JSON.parse(localStorage.getItem('weatherlyData'));
    
    if (previousData) {
      this.setState({
        currentObservation: previousData.currentData,
        hourlyForecast: previousData.hourlyData,
        tenDay: previousData.tenDayData
      });
      return null;
    }

    let previousSearch = JSON.parse(localStorage.getItem('weatherly'));
    let city = previousSearch ? previousSearch.city : 'Denver';
    let state = previousSearch ? previousSearch.state : 'CO';

    fetchWeatherData(city, state)
      .then(response => response.json())
      .then(data => {
        let currentData = weatherDataWrangler(data, 'currentObservation');
        let hourlyData = weatherDataWrangler(data, 'hourlyForecast');
        let tenDayData = weatherDataWrangler(data, 'tenDayForecast');

        localStorage.setItem('weatherlyData', JSON.stringify({
          currentData,
          hourlyData,
          tenDayData
        }));

        this.setState({
          currentObservation: currentData,
          hourlyForecast: hourlyData,
          tenDay: tenDayData
        });
      })
      .catch(error => console.log(error));
  }

  handleSearch(location) {
    let [city, state] = location.split(', ');

    localStorage.setItem('weatherly', JSON.stringify({city, state}));
    fetchWeatherData(city, state)
      .then(response => response.json())
      .then(data => this.setState({
        currentObservation: weatherDataWrangler(data, 'currentObservation'),
        hourlyForecast: weatherDataWrangler(data, 'hourlyForecast'),
        tenDay: weatherDataWrangler(data, 'tenDayForecast'),
        city,
        state
      }))
      .catch(error => console.log({error}));
  }

  render() {
    return (
      <div className="app">
        <Searchbar handleSearch={this.handleSearch} />
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