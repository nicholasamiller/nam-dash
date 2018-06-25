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
            loading: false,
            bom: {}
        }
    }


    refreshBom = () => {
        getBomReport().then(
            results => {
                const latestObservation = results;
                //const temp = results.observations.data[0].air_temp
                this.setState({bom: latestObservation})
            },
            error => {
                this.setState({bom: "error"})
            }
        )

    }


    componentWillMount() {
        this.setState({loading: true})
        this.refreshBom()
        this.setState({loading: false})
    }

    componentDidMount() {

        this.interval = setInterval(() => this.refreshBom(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        const currentTemp = this.state.bom.tempInC;
        const cloudType = this.state.bom.cloudType;
        const gustSpeed = this.state.bom.gustKmh;
        const lastReport = this.state.bom.observationTime;


        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <h1>Current</h1>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th scope="row">Temp</th>
                                <td>{currentTemp} °C</td>
                            </tr>
                            <tr>
                                <th scope="row">Cloud type</th>
                                <td>{cloudType}</td>
                            </tr>
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

                    </div>

                </div>
            </div>
        )

    }

}


export default BomWeatherComponent