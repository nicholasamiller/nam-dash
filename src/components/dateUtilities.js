import {DateTime, Interval} from 'luxon'


const TwentyFourHourTimeToLocalDateTime = (twentyFourHourTime) => {
    const splitToHoursAndMinutes = twentyFourHourTime.toString().split(":")

    const hour = parseInt(splitToHoursAndMinutes[0])
    const minute = parseInt(splitToHoursAndMinutes[1])

    const currentDateTime = DateTime.local()

    const timeWithHoursAndMins =
        DateTime.fromObject({day: currentDateTime.day, hour: hour,minute: minute, zone: 'Australia/Canberra', numeringSystem: 'beng'})

    return timeWithHoursAndMins
}

const GetMillisDelayToNextMinutesInHour = (t: DateTime, nextMinutesNUmber : Number) : number => {

    if (nextMinutesNUmber < 1 || nextMinutesNUmber > 60) throw 'minutes must be from 1 to 60'

    let now = t

    let findEndOfInterval = (i) => {
        if (i.minute < nextMinutesNUmber)
        {
            return now.set({minutes: nextMinutesNUmber}).startOf('minute')
        }
        else
        {
            return now.plus({hours: 1}).startOf('hour')
        }
    }

    const endOfInterval = findEndOfInterval(t)
    const interval = Interval.fromDateTimes(t,endOfInterval)
    return interval.length()

}

// calc delay to next hour
// start 31 min interval with delag

export  {TwentyFourHourTimeToLocalDateTime,GetMillisDelayToNextMinutesInHour}

