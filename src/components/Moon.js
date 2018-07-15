import SunCalc from 'suncalc'
import {DateTime} from 'luxon'
import React, {Component} from "react";
import {ConvertCamelCaseToTitleCase} from "../Utils";

const lat = -35.28346;
const long = 149.12807;


const getSunTimesForCanberra = () => {

    const currentDtInCanberra = DateTime.utc().toJSDate()
    const times = SunCalc.getTimes(currentDtInCanberra, lat, long);
    return times

}

const getMoonDetailForCanberra = () => {
    const dt = DateTime.utc().setZone('Australia/Canberra').toJSDate()
    const pos = SunCalc.getMoonPosition(/*Date*/ dt, /*Number*/ lat, /*Number*/ long);
    const times = SunCalc.getMoonTimes(/*Date*/ dt, /*Number*/ lat, /*Number*/ long, true);
    const illumination = SunCalc.getMoonIllumination(dt);
    return {
        pos,
        times,
        illumination
    }
}


const formatUtcToCanberraFriendlyTime = (utcTime: Date) => {
    const ianaZone = "Australia/Canberra";
    const zoned = DateTime.fromJSDate(utcTime).setZone(ianaZone);
    return zoned.toLocaleString(DateTime.TIME_SIMPLE)
}

//const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const round = (n) => n.toFixed(2)

const radToDegrees = (radians) => radians * 180 / Math.PI


class Sun extends Component {

    componentWillMount() {
        const sunData = getSunTimesForCanberra()
        this.setState({data: sunData})
    }

    render() {
        return <div className="card">
            <h2 className="card-title">Sun</h2>
            <div className="card-body">
                <table className="table table-sm">
                    <tbody>
                    <tr>
                        <th scope="row">Rises</th>
                        <td>
                            {formatUtcToCanberraFriendlyTime(this.state.data.sunrise)}
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">Nautical Sunrise</th>
                        <td>
                            {formatUtcToCanberraFriendlyTime(this.state.data.nauticalDawn)}
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">Sets</th>
                        <td>
                            {formatUtcToCanberraFriendlyTime(this.state.data.sunset)}

                        </td>
                    </tr>

                     <tr>
                        <th scope="row">Nautical Dusk</th>
                        <td>
                            { formatUtcToCanberraFriendlyTime(this.state.data.nauticalDusk)}

                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>
        </div>
    }

}

class Moon extends Component {

    constructor(props)
    {
        super(props);
    }

    componentWillMount() {
        const moonData = getMoonDetailForCanberra()
        this.setState({data: moonData})
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const newMoonData = getMoonDetailForCanberra()
            this.setState({data: newMoonData})
        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className="card">
                <h2 className="card-title">Moon</h2>
                <div className="card-body">
                <table className="table table-sm">
                    <tbody>
                    <tr>
                        <th scope="row">Rises</th>
                        <td>
                            {formatUtcToCanberraFriendlyTime(this.state.data.times.rise)}
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">Sets</th>
                        <td>
                            {this.state.data.times.set !== undefined  ? formatUtcToCanberraFriendlyTime(this.props.data.times.set) : ""}

                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Fraction</th>
                        <td>{round(this.state.data.illumination.fraction)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phase</th>
                        <td>{round(this.state.data.illumination.phase)}</td>
                    </tr>
                    {/*
            {Object.keys(props.data.illumination)
                .map(key => ({name: key, value: props.data.illumination[key]}))
                .map(item => <tr>
                    <th scope="row"> {capitalise(item.name)}</th>
                    <td>{round(item.value)}</td>
                </tr>)
            }*/}

                    </tbody>
                </table>
                </div>
            </div>

        )
    }
}


export {Moon, Sun, getMoonDetailForCanberra, formatUtcToCanberraFriendlyTime, getSunTimesForCanberra}