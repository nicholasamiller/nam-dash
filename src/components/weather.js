import React, {Component} from 'react'


// call this: http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json

const getBomReport = () => new Promise((resolves, rejects) => {
    const endPoint = "https://bom-observations.azurewebsites.net/api/GetBomWeatherData?code=GidqrAZTY7Ml3gTG1qhnzmDUMb5O8Vl5bEFqanW6fhtC69VGUog6Ww==&location=Canberra";
    var request = new XMLHttpRequest()

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
                this.setState({bom: results,loading: false})

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

        this.interval = setInterval(() => this.refreshBom(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        if (this.state.loading === true)
        {
            return <div>Loading...</div>
        }


        else if (this.state.bom === undefined)
        {
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
                <div className="row">
                    <div className="col-lg">
                        <h1>Current</h1>
                        <table className="table">
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
                                <td>{cloudHeight}m</td>
                            <tr>
                                <th scope="row">Wind Gust</th>
                                <td>{gustSpeed} kph</td>
                            </tr>
                            <tr>
                                <td>Last updated</td>
                                <td>{lastReport}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg">
                        <h1>Forecast</h1>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th scope="row">Forecast</th>
                                <td>{forecast}</td>
                            </tr>
                            <tr>
                                <th scope="row">UV Alert</th>
                                <td>{uvAlert === "" ? "None" : uvAlert}</td>
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