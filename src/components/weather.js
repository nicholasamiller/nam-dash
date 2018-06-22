import React, {Component} from 'react'


// call this: http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json

const getBomReport = () => new Promise((resolves,rejects) => {
    const endPoint = "http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json"
    const request = new XMLHttpRequest()
    request.open('GET',endPoint)
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
                const latestObservation = results.observations.data[0]
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
        this.setState({loading:false})
    }

    componentDidMount() {

        this.interval = setInterval(() => this.refreshBom(),60000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        const currentTemp = this.state.bom.air_temp
        const cloudType = this.state.bom.cloud_type
        const windDir = this.state.bom.wind_dir
        const windSpeed = this.state.bom.wind_spd_kmh
        const lastReport = this.state.bom.local_date_time


        return (
            <div>
                <table className="table-sm table-dark">
                    <tbody>
                        <tr>
                            <th scope="row">Current temp</th><td>{currentTemp} °C</td>
                        </tr>
                        <tr>
                            <th scope="row">Cloud type</th><td>{cloudType}</td>
                        </tr>
                        <tr>
                          <th scope="row">Wind</th><td>{windDir} {windSpeed} kph</td>
                        </tr>
                        <tr>
                            <td>Last updated</td><td>{lastReport}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

    }

}




export default BomWeatherComponent