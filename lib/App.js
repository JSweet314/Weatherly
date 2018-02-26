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
      city: '',
      state: '',
      currentObservation: null,
      hourlyForecast: null,
      tenDayForecast: null,
      welcome: true,
      error: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }
  
  setStateWithLocalStorage(data) {
    this.setState({
      currentObservation: data.currentObservation,
      hourlyForecast: data.hourlyForecast,
      tenDayForecast: data.tenDayForecast
    });
  }

  packageNewData(data, city, state) {    
    const hourlyForecast = weatherDataWrangler(data, 'hourlyForecast');
    const currentObservation = weatherDataWrangler(data, 'currentObservation');
    const tenDayForecast = weatherDataWrangler(data, 'tenDayForecast');

    return {
      hourlyForecast,
      currentObservation,
      tenDayForecast,
      city,
      state
    };
  }

  update(city, state) {
    fetchWeatherData(city, state)
      .then(response => response.json())
      .then(data => {
        const wrangledData = this.packageNewData(data, city, state);

        localStorage.setItem('weatherlyData', JSON.stringify(wrangledData));

        this.setState({
          currentObservation: wrangledData.currentObservation,
          hourlyForecast: wrangledData.hourlyForecast,
          tenDayForecast: wrangledData.tenDayForecast,
          welcome: false
        });
      })
      .catch(() => this.setState({error: true, welcome: true}));
  }

  componentDidMount() {
    const priorSearch = JSON.parse(localStorage.getItem('weatherlyData'));

    // if (priorSearch) {
    //   this.setStateWithLocalStorage(priorSearch);
    // } else {
    //   const state = 'TN';
    //   const city = 'Memphis';

    //   this.update(city, state);
    // }
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
          <Welcome error={this.state.error} handleSearch={this.handleSearch} />
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