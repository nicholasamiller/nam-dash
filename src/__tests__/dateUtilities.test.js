import  "../components/dateUtilities";

import {DateTime,Interval, Duration} from 'luxon'
import {getMillisDelayToNextMinutesInHour} from "../components/dateUtilities";
import {getMoonDetailForCanberra, getTimesForCanberra} from "../components/Moon";
import {formatUtcToCanberraFriendlyTime} from "../components/Moon";


test('converts 24 hour time to local date time for today', () => {
   const testData = 13
   const result = twentyFourHourTimeToLocalDateTime(testData)

   expect(result.hour).toBe(13)
} )


test('30 mins to next half hour', () => {
    const testStartTime = DateTime.fromISO('2000-01-01T00:00:00.00')
    const result = getMillisDelayToNextMinutesInHour(testStartTime,30)
    expect(result).toBe(1800000)
})

test('max duration if 60 specified', () => {
    const testStartTime = DateTime.fromISO('2000-01-01T00:00:00.00')
    const result = getMillisDelayToNextMinutesInHour(testStartTime,60)
    expect(result).toBe(3600000)
})

test('sunrise and sunset times', () => {
    const result = getTimesForCanberra();
    console.log(result)
})


test('get moon details', () => {
    const result = getMoonDetailForCanberra()
    console.log(result)
})

test('format utc as canberra time', () => {
    const testData = DateTime.utc();
    const result = formatUtcToCanberraFriendlyTime(testData)
    console.log(result)
})

