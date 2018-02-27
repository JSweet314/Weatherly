import React, {Component} from 'react';
import Searchbar from './Searchbar';
import CurrentWeather from './CurrentWeather';
import TenDayForecast from './TenDayForecast';
import SevenHourForecast from './SevenHourForecast';
import fetchWeatherData from './fetchWeatherData';
import weatherDataWrangler from './weatherDataWrangler';
import Welcome from './Welcome';
import "./stylesheets/App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: localStorage.getItem('weatherlySearch') || '',
      currentObservation: {},
      hourlyForecast: [],
      tenDayForecast: [],
      welcome: true,
      error: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.update = this.update.bind(this);
  }
  
  componentDidMount() {
    if (this.state.location) {
      this.handleSearch(this.state.location);
    }
  }

  update(city, state) {
    fetchWeatherData(city, state)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('weatherlySearch', city + ', ' + state);

        this.setState({
          currentObservation: weatherDataWrangler(data, 'currentObservation'),
          hourlyForecast: weatherDataWrangler(data, 'hourlyForecast'),
          tenDayForecast: weatherDataWrangler(data, 'tenDayForecast'),
          welcome: false,
          location: city + ', ' + state
        });
      })
      .catch(() => this.setState({error: true, welcome: true}));
  }

  handleSearch(location) {
    const [city, state] = location.split(', ');

    this.update(city, state);
  }

  render() {
    return (
      <div>
        {
          this.state.welcome &&
          <div className="app">
            <Welcome 
              lastSearch={this.state.location} 
              error={this.state.error}
              handleSearch={this.handleSearch} 
            />
          </div>
        }
        {
          !this.state.welcome && 
          <div className='app'>
            <Searchbar handleSearch={this.handleSearch} />
            <CurrentWeather currentObservation={this.state.currentObservation}
            />
            <SevenHourForecast hourlyForecast={this.state.hourlyForecast} />
            <TenDayForecast tenDayForecast={this.state.tenDayForecast} />
          </div>
        }
      </div>
    );
  }
}