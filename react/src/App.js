import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { TabMenu } from 'primereact/tabmenu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from './Settings';
import ShiftDetails from './ShiftDetails';


import axios from 'axios';

function Shift() {
  return <h2>Home</h2>;
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
      vehicle: '',
      value: '',
      date: '',
      resTotal: 0,
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

  async getTrips() {
    const res = await axios.get('https://813fjxvnka.execute-api.us-east-1.amazonaws.com/v1/getdata');
    const { data } = await res;

    const result = Object.values(data);
    const resultData = result[0];

    this.setState({ resultData })
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