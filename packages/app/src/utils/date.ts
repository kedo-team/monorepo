import { date as qDate } from 'quasar'
import { datei18n } from './quasar-i18n'

export function tryParseDate (strVal: string): Date {
    const date = new Date(Date.parse(strVal))
    if (!date) throw new Error(`Cannot parse date: ${date}`)
    return date
}

export function formatRuDate(date: Date | string) {
  let dateValue: Date = null;
  if (typeof date === 'string' || date instanceof String) {
    dateValue = tryParseDate(<string>date)
  }
  return qDate.formatDate(date, 'D MMM YY, ddd', datei18n)
}

export function isFreeDaysInside(from: string, to: string) {
  if (!from || !to)
    return false;

  let currentDate = qDate.subtractFromDate(new Date(from), {days: 1})
  const endDate = new Date(to)

  do {

    currentDate = qDate.addToDate(currentDate, {days: 1})

    const found = isDayOff(currentDate)
    // console.log(currentDate, found)
    if (found) return true
  } while (qDate.isSameDate(currentDate, endDate) == false)

    return false
}

function isDayOff(d: Date): boolean {
  const dow = qDate.getDayOfWeek(d)
  return [6, 7].includes(dow)
}