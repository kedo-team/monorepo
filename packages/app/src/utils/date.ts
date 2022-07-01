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