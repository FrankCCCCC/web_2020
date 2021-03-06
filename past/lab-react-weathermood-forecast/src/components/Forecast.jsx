import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import Today from 'components/Today.jsx';
import WeatherDisplayFore from 'components/WeatherDisplayFore.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {getForecast} from 'api/open-weather-map.js';
import {getWeather} from 'api/open-weather-map.js';
import './weather.css';

export default class Forecast extends React.Component {
  static propTypes = {
    masking: React.PropTypes.bool,
    group: React.PropTypes.string,
    description: React.PropTypes.string,
    temp: React.PropTypes.number,
    unit: React.PropTypes.string,
  };

  static getInitWeatherState() {
    return {
      city: 'na',
      code: -1,
      group: 'na',
      description: 'N/A',
      temp: NaN,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      ...Today.getInitWeatherState(),
      loading: false,
      masking: false,
    };

    // TODO
    this.handleFormQuery = this.handleFormQuery.bind(this);
    this.maskInterval = null;
  }

  componentDidMount() {
    this.getForecast('Hsinchu', 'metric');
  }

  componentWillUnmount() {
    if (this.state.loading) {
      cancelWeather();
    }
  }
/*
  render() {
    return (
      <div className={`forecast weather-bg ${this.state.group}`}>
        <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
          <h1 className='text-center'>Forecast (unit: {this.props.unit})</h1>
        </div>
      </div>
    );
  }*/

  render() {
    return (
      <div className={`today weather-bg ${this.state.group}`}>
        <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
          <WeatherDisplayFore {...this.state}/>
          <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
        </div>
      </div>
    );
  }

  getWeather(city, unit) {
    this.setState({
      loading: true,
      masking: true,
      city: city, // set city state immediately to prevent input text (in WeatherForm) from blinking;
    }, () => { // called back after setState completes
      getWeather(city, unit).then(weather => {
        this.setState({
          ...weather,
          loading: false,
        }, () => this.notifyUnitChange(unit));
      }).catch(err => {
        console.error('Error getting weather', err);

        this.setState({
          ...Today.getInitWeatherState(unit),
          loading: false,
        }, () => this.notifyUnitChange(unit));
      });
    });

    this.maskInterval = setInterval(() => {
      clearInterval(this.maskInterval);
      this.setState({
        masking: false,
      });
    }, 600);
  }

  getForecast(city, unit) {
    this.setState({
      loading: true,
      masking: true,
      city: city, // set city state immediately to prevent input text (in WeatherForm) from blinking;
    }, () => { // called back after setState completes
      console.log('TTT');
      getForecast(city, unit).then(weather => {
        this.setState({
          ...weather,
          loading: false,
        }, () => this.notifyUnitChange(unit));
      }).catch(err => {
        console.error('Error getting weather', err);

        this.setState({
          ...Forecast.getInitWeatherState(unit),
          loading: false,
        }, () => this.notifyUnitChange(unit));
      });
    });

    this.maskInterval = setInterval(() => {
      clearInterval(this.maskInterval);
      this.setState({
        masking: false,
      });
    }, 600);
  }

  handleFormQuery(city, unit) {
    this.getForecast(city, unit);
  }

  notifyUnitChange(unit) {
    if (this.props.units !== unit) {
      this.props.onUnitChange(unit);
    }
  }
}
