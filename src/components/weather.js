import React, {Component} from 'react'
import {DateTime} from 'luxon'
import {GetMillisDelayToNextMinutesInHour} from "./dateUtilities";

// call this: http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json

const getBomReport = () => new Promise((resolves, rejects) => {
    const endPoint = "/getBomData";
    const request = new XMLHttpRequest();

    request.open('GET', endPoint)


    request.onload = () => (request.status === 200) ?
        resolves(JSON.parse(request.response)) :
        rejects(Error(request.statusText))
    request.onerror = err => rejects(err)
    request.send()

})



class BomWeatherComponent extends Component {

    constructor() {
        super()
        this.state = {
            loading: true
        }
    }


    refreshBom = () => {
        getBomReport().then(
            results => {
                this.setState({bom: results, loading: false})

            },
            error => {
                this.setState({bom: "error"})
            }
        )

    }


    componentWillMount() {
        this.refreshBom()
    }

    componentDidMount() {

        const delayToNextHalfHour = GetMillisDelayToNextMinutesInHour(DateTime.local(), 30)
        const delayPlusTenSecs = delayToNextHalfHour + 10000
        const thirtyMinDelayInMs = 30 * 60 * 100
        this.timeout = setTimeout(() =>

                this.interval = setInterval(this.refreshBom(), thirtyMinDelayInMs),
            delayPlusTenSecs
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout)
    }

    render() {

        if (this.state.loading === true) {
            return <div>Loading...</div>
        }


        else if (this.state.bom === undefined) {
            return <div>Error</div>
        }
        else {


            const currentTemp = this.state.bom.observation.tempInC;
            const feelslike = this.state.bom.observation.feelsLikeTempInC;
            const cloudType = this.state.bom.observation.cloudType;
            const gustSpeed = this.state.bom.observation.gustKmh;
            const lastReport = this.state.bom.observation.observationTime;
            const cloudHeight = this.state.bom.observation.cloudHeightInM;

            const forecast = this.state.bom.forecast.forecast;
            const uvAlert = this.state.bom.forecast.uvAlert;

            return (
                <div className="card">
                    <h2 className="card-title">Weather</h2>
                    <div className="card-body">

                    <table className="table table-sm">
                        <tbody>
                        <tr>
                            <th scope="row">Air Temp</th>
                            <td>{currentTemp} °C</td>
                        </tr>
                        <tr>
                            <th scope="row">Feels Like</th>
                            <td>{feelslike} °C</td>
                        </tr>
                        <tr>
                            <th scope="row">Cloud type</th>
                            <td>{cloudType}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cloud height</th>
                            <td>{cloudHeight !== "" ? cloudHeight + "m" : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row">Wind Gust</th>
                            <td>{gustSpeed} kph</td>
                        </tr>
                        <tr>
                            <th scope="row">Forecast</th>
                            <td>{forecast}</td>
                        </tr>
                        <tr>
                            <th scope="row">UV Alert</th>
                            <td>{uvAlert === "" ? "None" : uvAlert}</td>
                        </tr>
                        <tr>
                            <td>Last updated</td>
                            <td>{lastReport}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
    }
}


export default BomWeatherComponent