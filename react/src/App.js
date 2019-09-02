import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CountUp from 'react-countup';
import { TabMenu } from 'primereact/tabmenu';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from './Settings';


import axios from 'axios';



function Shift() {
  return <h2>Home</h2>;
}

class ShiftDetails extends Component {

  async getTrips() {
    const res = await axios.get('https://813fjxvnka.execute-api.us-east-1.amazonaws.com/v1/getdata');
    const { data } = await res;

    const result = Object.values(data);
    const resultData = result[0];

    this.setState({ resultData })
  }



  render() {

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [
        {
          label: 'Average Minutes to Respond',
          data: [5, 20, 5, 15, 6, 4, 8, 19],
          fill: false,
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        },
      ]
    };

    const cars = this.resultData;

    return (<div className="App">
      <div className="Info-row">
        <div className="App-intro">
          <h1>
            <CountUp end={this.props.state.scooterArray.length}> </CountUp>
          </h1>
        </div>
        <div className="App-intro">
          <h1>
            <CountUp end={this.props.state.scooterArray.length}> </CountUp>
          </h1>
        </div>
        <div className="App-intro">
          <h1>
            <CountUp end={this.props.state.scooterDistance}></CountUp>
          </h1>
        </div>
        <div className="App-intro">
          <h1>
            <CountUp end={this.props.state.bikeArray.length}></CountUp>
          </h1>
        </div>
      </div>
      <div className="response-time-row">
        <h2> Incident Response Time </h2>
        <Chart width="90vw" height="20%" type="line" data={data} />
      </div>
      <div className="last-row">
        <h2 className="last-text"> Last Incidents </h2>
        <DataTable className="incident-data" value={cars}>
          <Column field="county" header="County" />
          <Column field="district" header="District" />
          <Column field="month" header="Month" />
          <Column field="officer" header="Officer" />
          <Column field="res_time" header="Response Time" />
        </DataTable>
      </div>
    </div>);
  }

}

class App extends Component {
  constructor (props) {
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
      items: [
        {
          label: 'Your Shift', icon: 'pi pi-fw pi-home', command: (event) => {
            window.location = "home";
          }
        },
        {
          label: 'Shift Details', icon: 'pi pi-fw pi-calendar', command: (event) => {
            window.location = "/";
          }
        },
        {
          label: 'Settings', icon: 'pi pi-fw pi-pencil', command: (event) => {
            window.location = "/settings";
          }
        }
      ],
    };

    this.handleVehicle = this.handleVehicle.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }


  componentDidMount() {
    this.getTrips();
    switch (window.location.pathname) {
      case "/home":
        this.setState({ activeItem: this.state.items[0] });
        break;
      case "/":
        this.setState({ activeItem: this.state.items[1] });
        break;
      case "/settings":
        this.setState({ activeItem: this.state.items[2] });
        break;
    }

  }

  handleVehicle(event) {
    this.setState({ vehicle: event.target.value });
    this.switchVehicle(event.target.value);
  }

  handleDate(event) {
    this.setState({ date: event.target.value });
    this.switchDate(event.target.value);
  }

  async filterDate(params) {
    let endpoint = 'https://data.austintexas.gov/resource/7d8e-dm7r.json';
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

    this.setState({ trips: data, bikeArray, scooterArray, scooterDistance, bikeDistance, totalDistance })
  }

  render() {

    return (
      <div>
        <div className="App-header">
          <div className="app-menu">
            <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({ activeItem: e.value })} />
          </div>
        </div>
        <Router>
          <Route path="home" component={Shift} />
          <Route path="/" exact render={() => (<ShiftDetails state={this.state} />)} />
          <Route path="/settings/" render={() => (<Settings state={this.state} />)} />
        </Router>
      </div>
    );
  }
}

export default App;