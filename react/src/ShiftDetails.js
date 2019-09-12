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
            resArray: 0,
            resAvg: 0,
            resTime: 0,
            resArr: [],
            table: [],
        };
    }

    componentDidMount() {
        this.getTrips();
    }

    async getTrips() {
        const resultData = [];
        let resAvg = 0;
        let resArray = 0;
        const resArr = [];
        const res = await axios.get('https://813fjxvnka.execute-api.us-east-1.amazonaws.com/v1/getdata');
        const { data } = await res;

        const result = Object.values(data);
        resultData.push(result[0]);
        resultData[0].forEach(element => {
            resArray += element.res_time;
            resArr.push(element.res_time);
        });
        resAvg = resArray / resultData[0].length;
        this.setState({ trips: resultData[0], resTime: resAvg, table: resArr });
    }

    render() {

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            datasets: [
                {
                    label: 'Average Minutes to Respond',
                    data: this.state.table,
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
                        <CountUp end={this.state.resTime}> </CountUp>
                    </h1>
                </div>
                <div className="App-intro">
                    <h1>
                        <CountUp end={this.state.resTime}> </CountUp>
                    </h1>
                </div>
                <div className="App-intro">
                    <h1>
                        <CountUp end={this.state.resTime}></CountUp>
                    </h1>
                </div>
                <div className="App-intro">
                    <h1>
                        <CountUp end={this.state.resTime}></CountUp>
                    </h1>
                </div>
            </div>
            <div className="response-time-row">
                <h2> Incident Response Time </h2>
                <Chart width="90vw" height="20%" type="line" data={data} />
            </div>
            <div className="last-row">
                <h2 className="last-text"> Last Incidents </h2>
                <DataTable className="incident-data" value={this.state.trips}>
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