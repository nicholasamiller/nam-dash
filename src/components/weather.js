import React, {Component} from 'react'


// call this: http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json

const getBomReport = () => new Promise((resolves,rejects) => {
    const endPoint = "http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json"
    const request = new XMLHttpRequest()
    request.open('GET',endPoint)
    request.onload = () => (request.status == 200) ?
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



    componentWillMount() {
        this.setState({loading: true})
        getBomReport().then(
            results => {
                const latestObservation = results.observations.data[0]
                //const temp = results.observations.data[0].air_temp
                this.setState({bom: latestObservation, loading: false})
            },
            error => {
                this.setState({currentTemp: "error", loading: false})
            }
        )
    }

    render() {

        const currentTemp = this.state.bom.air_temp

        return (
            <div>
                <p>Current: {currentTemp}</p>
            </div>
        )

    }

}




export default BomWeatherComponent