import SunCalc from 'suncalc'
import {DateTime} from 'luxon'
import React, {Component} from "react";

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
    return zoned.hour + ":" + zoned.minute
}

//const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const round = (n) => n.toFixed(2)

const radToDegrees = (radians) => radians * 180 / Math.PI

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
                <div className="card-body">
                    <h2 className="card-title">Moon</h2>
                <table className="table">
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
                            {this.state.data.times.set !== undefined ? formatUtcToCanberraFriendlyTime(this.props.data.times.set) : ""}

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
                    <tr>
                        <th scope="row">Angle</th>
                        <td>{round(this.state.data.illumination.angle)}°</td>
                    </tr>
                    <tr>
                        <th scope="row">Azimuth</th>
                        <td>{round(radToDegrees(this.state.data.pos.azimuth))}°</td>
                    </tr>
                    <tr>
                        <th scope="row">Altitude</th>
                        <td>{round(radToDegrees(this.state.data.pos.altitude))}°</td>
                    </tr>
                    <tr>
                        <th scope="row">Distance</th>
                        <td>{round(this.state.data.pos.distance)} kms</td>
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


export {Moon, getMoonDetailForCanberra, formatUtcToCanberraFriendlyTime, getSunTimesForCanberra}