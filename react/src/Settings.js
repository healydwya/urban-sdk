import React, { Component } from 'react';
import './Settings.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputSwitch } from 'primereact/inputswitch';

class Settings extends Component {
    constructor (props) {
        super(props);
        this.state = {
            geovalue: true,
            zoomvalue: true,
            routesvalue: true,
            shiftvalue: true,
        };
    }

    render() {

        return (
            <div className="settings-page">
                <h1 className="prefs-title"> Preferences </h1>
                <div className="settings-box">
                    <div className="settings-row">
                        <div className="row-title">
                            Geolocation
                        </div>
                        <div className="row-switch">
                            <InputSwitch checked={this.state.geovalue} onChange={(e) => this.setState({ geovalue: e.value })} />
                        </div>
                        <div className="row-text">
                            Info about geo location.
                        </div>
                    </div>
                    <div className="settings-row">
                        <div className="row-title">
                            Auto Zoom
                        </div>
                        <div className="row-switch">
                            <InputSwitch checked={this.state.zoomvalue} onChange={(e) => this.setState({ zoomvalue: e.value })} />
                        </div>
                        <div className="row-text">
                            Info about auto zoom.
                        </div>
                    </div>
                    <div className="settings-row">
                        <div className="row-title">
                            Alternative Routes
                        </div>
                        <div className="row-switch">
                            <InputSwitch checked={this.state.routesvalue} onChange={(e) => this.setState({ routesvalue: e.value })} />
                        </div>
                        <div className="row-text">
                            Info about alternative routes.
                        </div>
                    </div>
                    <div className="settings-row">
                        <div className="row-title">
                            Auto Shift Completion
                        </div>
                        <div className="row-switch">
                            <InputSwitch checked={this.state.shiftvalue} onChange={(e) => this.setState({ shiftvalue: e.value })} />
                        </div>
                        <div className="row-text">
                            Info about auto shift completion.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;