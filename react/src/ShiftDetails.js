import React, { Component } from 'react';
import './ShiftDetails.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CountUp from 'react-countup';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import axios from 'axios';

class ShiftDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            resultData: [],
        };
    }

    componentDidMount() {
        this.getTrips();
    }

    async getTrips() {
        const resultData = [];
        const res = await axios.get('https://813fjxvnka.execute-api.us-east-1.amazonaws.com/v1/getdata');
        const { data } = await res;

        const result = Object.values(data);
        resultData.push(result[0]);
        this.setState({ resultData });
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
                <DataTable className="incident-data" value={this.resultData}>
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

export default ShiftDetails;