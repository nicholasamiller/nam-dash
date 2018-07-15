import  "../components/dateUtilities";

import {DateTime,Interval, Duration} from 'luxon'
import {GetMillisDelayToNextMinutesInHour, TwentyFourHourTimeToLocalDateTime} from "../components/dateUtilities";
import {GetMoonDetailForCanberra, getSunTimesForCanberra} from "../components/Moon";
import {formatUtcToCanberraFriendlyTime} from "../components/Moon";


test('converts 24 hour time to local date time for today', () => {
   const testData = 13
   const result = TwentyFourHourTimeToLocalDateTime(testData)

   expect(result.hour).toBe(13)
} )


test('30 mins to next half hour', () => {
    const testStartTime = DateTime.fromISO('2000-01-01T00:00:00.00')
    const result = GetMillisDelayToNextMinutesInHour(testStartTime,30)
    expect(result).toBe(1800000)
})

test('max duration if 60 specified', () => {
    const testStartTime = DateTime.fromISO('2000-01-01T00:00:00.00')
    const result = GetMillisDelayToNextMinutesInHour(testStartTime,60)
    expect(result).toBe(3600000)
})

test('sunrise and sunset times', () => {
    const result = getSunTimesForCanberra();

    const resultSpread = {...result}



    console.log(resultSpread)
})


test('get moon details', () => {
    const result = GetMoonDetailForCanberra()
    console.log(result)
})

test('format utc as canberra time', () => {
    const testData = DateTime.utc();
    const result = formatUtcToCanberraFriendlyTime(testData)
    console.log(result)
})

