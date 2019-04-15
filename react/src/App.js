import React, { Component } from 'react';
import './App.css';
import scooter from './assets/scooter.svg';
import map from './assets/map.svg';
import bicycle from './assets/bicycle.svg';
import CountUp from 'react-countup';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      store: [],
      isLoading: true, 
      errors: null,
      bikeArray: [],
      scooterArray: [],
      bikeDistance: 0,
      scooterDistance: 0,
      totalDistance: 0, 
      vehicle: '',
      value: '',
      date: '',
    };

    this.handleVehicle = this.handleVehicle.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount() {
    this.getTrips();
  }

  handleVehicle(event) {
    this.setState({vehicle: event.target.value});
    this.switchVehicle(event.target.value);
  }

  handleDate(event) {
    this.setState({date: event.target.value});
    this.switchDate(event.target.value);
  }

  async getTrips(){
    const res = await axios.get('https://data.austintexas.gov/resource/7d8e-dm7r.json');
    const { data } = await res;
    const bikeArray = [];
    const scooterArray = [];
    let bikeDistance = 0;
    let scooterDistance = 0;

    data.forEach(element => {
      switch (element.vehicle_type) {
        case 'bicycle':
          bikeArray.push(element);
          bikeDistance += parseInt(element.trip_distance);
          break;
        case 'scooter':
          scooterArray.push(element);
          scooterDistance += parseInt(element.trip_distance);
          break;
  
        default:
          break;
      }
    });

    let totalDistance = Math.ceil((scooterDistance + bikeDistance) * 0.00062137);
    bikeDistance = Math.ceil(bikeDistance * 0.00062137);
    scooterDistance = Math.ceil(scooterDistance * 0.00062137);

    this.setState({trips: data, bikeArray, scooterArray, scooterDistance, bikeDistance, totalDistance})
  }

  async filterDate(params){
    let endpoint = 'https://data.austintexas.gov/resource/7d8e-dm7r.json' + params;
    const res = await axios.get(endpoint);
    const { data } = await res;
    const bikeArray = [];
    const scooterArray = [];
    let bikeDistance = 0;
    let scooterDistance = 0;

    data.forEach(element => {
      switch (element.vehicle_type) {
        case 'bicycle':
          bikeArray.push(element);
          bikeDistance += parseInt(element.trip_distance);
          break;
        case 'scooter':
          scooterArray.push(element);
          scooterDistance += parseInt(element.trip_distance);
          break;
  
        default:
          break;
      }
    });

    let totalDistance = Math.ceil((scooterDistance + bikeDistance) * 0.00062137);
    bikeDistance = Math.ceil(bikeDistance * 0.00062137);
    scooterDistance = Math.ceil(scooterDistance * 0.00062137);

    this.setState({trips: data, bikeArray, scooterArray, scooterDistance, bikeDistance, totalDistance})
  }

  switchDate(date) {
    switch (date) {
      case "apr-19":
        this.filterDate('?month=04&year=2019');
        break;
      case "mar-19":
        this.filterDate('?month=03&year=2019');
        break;
      case "feb-19":
        this.filterDate('?month=02&year=2019');
        break;
      case "jan-19":
        this.filterDate('?month=01&year=2019');
        break;
      case "dec-18":
        this.filterDate('?month=12&year=2018');
        break;
      case "nov-18":
        this.filterDate('?month=11&year=2018');
        break;
      case "oct-18":
        this.filterDate('?month=10&year=2018');
        break;
      case "sep-18":
        this.filterDate('?month=09&year=2018');
        break;
      case "aug-18":
        this.filterDate('?month=08&year=2018');
        break;
      case "jul-18":
        this.filterDate('?month=07&year=2018');
        break;
      case "june-18":
        this.filterDate('?month=06&year=2018');
        break;
      case "may-18":
        this.filterDate('?month=05&year=2018');
        break;
      case "apr-18":
        this.filterDate('?month=04&year=2018');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="header-title"> ATX Dockless Mobility </h1>
        </div>
        <div className="selection-row">
          <div> 
            <h2> Filter by Date Range: </h2>
            <select value={this.state.date} onChange={this.handleDate}>
              <option value="" disabled selected>Select Date</option>
              <option value="apr-19"> April 2019 </option>
              <option value="mar-19"> March 2019 </option>
              <option value="feb-19"> February 2019 </option>
              <option value="jan-19"> January 2019 </option>
              <option value="dec-18"> December 2018 </option>
              <option value="nov-18"> November 2018 </option>
              <option value="oct-18"> October 2018 </option>
              <option value="sep-18"> September 2018 </option>
              <option value="aug-18"> August 2018 </option>
              <option value="jul-18"> July 2018 </option>
              <option value="june-18"> June 2018 </option>
              <option value="may-18"> May 2018 </option>
              <option value="apr-18"> April 2018 </option>
            </select>
          </div>
        </div>
        <div className="Info-row"> 
            <img className="App-img" src={scooter}/>
            <div className="App-intro">
              <h1> 
                <CountUp end={this.state.scooterArray.length}> </CountUp>
              </h1>
              Trips Made
            </div>
            <div className="App-intro">
              <h1> 
                <CountUp end={ this.state.scooterDistance }></CountUp>
              </h1>
              Miles Ridden
            </div>
            <div className="App-intro">
              <h1>
                <CountUp end={ this.state.bikeArray.length }></CountUp> 
              </h1>
              Devices Utilized
            </div>
        </div>
        <div className="Info-row"> 
          <img className="App-img" src={bicycle}/>
            <div className="App-intro">
              <h1>
                <CountUp end={ this.state.bikeArray.length }></CountUp> 
              </h1>
              Trips Made
            </div>
            <div className="App-intro">
              <h1>
                <CountUp end={ this.state.bikeDistance }></CountUp> 
              </h1>
              Miles Ridden
            </div>
            <div className="App-intro">
            <h1>
              <CountUp end={ this.state.bikeArray.length }></CountUp>
            </h1>
              Devices Utilized
            </div>
        </div>
        <div className="Info-row"> 
        <img className="App-img" src={map}/>
            <div className="App-intro">
            <h1>
              <CountUp end={ this.state.trips.length }></CountUp> 
            </h1>
              Overall Trips
            </div>
            <div className="App-intro">
              <h1><CountUp end={ this.state.totalDistance }></CountUp>
              </h1> 
              Overall Miles
            </div>
            <div className="App-intro">
              <h1><CountUp end={ this.state.bikeArray.length }>
                </CountUp>
              </h1> 
              Overall Devices
            </div>
        </div>
      </div>
    );
  }
}

export default App;
