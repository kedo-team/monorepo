<template lang='pug'>
.row.justify-between.q-pb-md
  //- .col-auto
  //-   q-input(v-model='textFillterModel')
  .col-auto.text-center
    KT-ButtonToggle(v-model='filterModel'
                 :options='filterOptions')
  .col-auto
    .row
      q-btn-group(outline).kt-navigation
        q-btn(outline @click='qcal.moveToToday()' icon='watch_later')
        q-btn(outline @click='qcal.prev()' icon='navigate_before')
        q-btn(outline @click='qcal.next()' icon='navigate_next')

//- docs: https://qcalendar.netlify.app/developing/qcalendarscheduler/scheduler-getting-started
QCalendarScheduler(:view='filterModel'
                  v-model='selectedDate'
                  v-model:model-resources='result'
                  resource-key='id'
                  resource-label='firstName'
                  :resource-height="40"
                  :resource-min-height="40"
                  :resource-width='200'
                  :resource-min-width="200"
                  animated
                  bordered
                  locale='ru'
                  :weekdays='[1,2,3,4,5,6,0]'
                  ref='qcal'
                )
  //- template(#resource-row)
  //-   div.bg-red
  template(#resource-days="{ scope }")
    template(v-for="(event, index) in getEvents(scope)"
            :key="index")
      q-badge(color="blue"
              :label="getStrStatus(event.status)"
              :style="getStyle(scope, event)")

  //-----------------------------------------------------------
  template(#resource-label="{ scope: { resource } }")
    .col-12
      KT-UserAvatar(:data='resource')
</template>

<style lang='sass'>
.kt-navigation
  color: lighten($kedo-text-main-color, 20%)
</style>

<script setup lang='ts'>
import { ref } from 'vue'
import { date } from 'quasar'
import * as dateUtils from 'src/utils/date'
import { QCalendarScheduler, today } from '@quasar/quasar-ui-qcalendar/'
import type { IFilterOption } from 'src/view-model'
import cfg from 'src/config'
import type { IVacation, Status } from '@kedo-team/data-model'


const {result, loading, error} = cfg.providers.unitVacation.getUnitsVacation()
const qcal = ref(null)
const textFillterModel = ref<string>(null)
console.log(qcal)
const filterOptions: IFilterOption[] = [
  {
    label: 'Неделя',
    value: 'week',
    default: true
  },
  {
    label: 'Месяц',
    value: 'month'
  },
]

const filterModel = ref('week')
const selectedDate = ref(today())

function getEvents (scope: any): IVacation[] {
  const vacations: IVacation[] = scope.resource.vacationsList;
  if (!vacations || vacations.length === 0)
    return [];
  // cheking if events will be visible on current schedule
  const startScheduleDate = scope.days[0].date
  const endScheduleDate   = scope.days[scope.days.length-1].date

  const filteredVacations =  vacations.filter(vac => {
    const isVisible = checkDateRange(vac.payload.dateFrom, startScheduleDate, endScheduleDate)
                      ||
                      checkDateRange(vac.payload.dateTo, startScheduleDate, endScheduleDate)
    return isVisible
  })

  return filteredVacations
}

function checkDateRange(target: string, startRange: string, endRange: string): boolean {
  const targetDate = dateUtils.tryParseDate(target)
  const startDate =  dateUtils.tryParseDate(startRange)
  const endDate   =  dateUtils.tryParseDate(endRange)

  const opts = {
    inclusiveFrom: true,
    inclusiveTo: true,
    onlyDate: true
  }
  return date.isBetweenDates(targetDate, startDate, endDate, opts)
}

function getEventLeft(scope: any, event: IVacation): string {
  // event.dow = Это насколько от левой даты начинается отпуск

  // 1 вычисляем с какого индекса стартовать отрисовку (0 - первый)
  const eventFromDate = dateUtils.tryParseDate(event.payload.dateFrom)
  const scheduleFromDate = dateUtils.tryParseDate(scope.days[0].date)
  // https://quasar.dev/quasar-utils/date-utils#difference
  const difference = date.getDateDiff(eventFromDate, scheduleFromDate, 'days')
  const left = difference < 0 ? 0 : difference *
               parseFloat(scope.cellWidth)
  const retVal = left + (scope.cellWidth.endsWith('%') ? '%' : 'px')
  return retVal
}

function getEventWidth(scope: any, event: IVacation): string {
  // RANGE = продолжитльность в днях
  // const width = (event.range ? event.range : 2) * parseFloat(scope.cellWidth)
  const width = 2 * parseFloat(scope.cellWidth)
  const val = width + (scope.cellWidth.endsWith('%') ? '%' : 'px')
  return val
}

function  getStyle (scope: any, event: IVacation) {
      return {
        position: 'absolute',
        background: 'white',
        left: getEventLeft(scope, event),
        width: getEventWidth(scope, event)
      }
}

function getStrStatus (status: Status) {
  switch (status) {
    case 'IN_PROGRESS': return 'Ожидает согласоваия'
    case 'APPROVED': return 'Согласован'
    default: "?"
  }
}

</script>