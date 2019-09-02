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
            <div class="settings-page">
                <h1 class="prefs-title"> Preferences </h1>
                <div class="settings-box">
                    <div class="settings-row">
                        <div class="row-title">
                            Geolocation
                        </div>
                        <div class="row-switch">
                            <InputSwitch checked={this.state.geovalue} onChange={(e) => this.setState({ geovalue: e.value })} />
                        </div>
                        <div class="row-text">
                            Info about geo location.
                        </div>
                    </div>
                    <div class="settings-row">
                        <div class="row-title">
                            Auto Zoom
                        </div>
                        <div class="row-switch">
                            <InputSwitch checked={this.state.zoomvalue} onChange={(e) => this.setState({ zoomvalue: e.value })} />
                        </div>
                        <div class="row-text">
                            Info about auto zoom.
                        </div>
                    </div>
                    <div class="settings-row">
                        <div class="row-title">
                            Alternative Routes
                        </div>
                        <div class="row-switch">
                            <InputSwitch checked={this.state.routesvalue} onChange={(e) => this.setState({ routesvalue: e.value })} />
                        </div>
                        <div class="row-text">
                            Info about alternative routes.
                        </div>
                    </div>
                    <div class="settings-row">
                        <div class="row-title">
                            Auto Shift Completion
                        </div>
                        <div class="row-switch">
                            <InputSwitch checked={this.state.shiftvalue} onChange={(e) => this.setState({ shiftvalue: e.value })} />
                        </div>
                        <div class="row-text">
                            Info about auto shift completion.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;