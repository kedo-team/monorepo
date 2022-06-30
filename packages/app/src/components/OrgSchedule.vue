<template lang='pug'>
.row.flex-center.q-pb-md
  .col.text-center
    ToggleFilters(:options='filterOptions'
                  @changed='filterChanged')


QCalendarScheduler(:view='viewModel'
                  v-model:model-resources='result'
                  resource-key='id'
                  resource-label='firstName'
                  :resource-height="40"
                  :resource-width='100'
                  :resource-min-height="40"
                  animated
                  bordered
                  locale='ru'
                  :weekdays='[1,2,3,4,5,6,0]'
                )
  //- template(#resource-row)
  //-   div.bg-red
  template(#resource-days="{ scope }")
    template(v-for="(event, index) in getEvents(scope)"
            :key="index")
      q-badge(color="blue"
              :label="event.status"
              :style="getStyle(scope, event)")  
    
  //-----------------------------------------------------------
  template(#resource-label="{ scope: { resource } }")
    KT-UserAvatar(:data='resource')
</template>

<style lang='sass'>
</style>

<script setup lang='ts'>
import { ref } from 'vue'
import { date } from 'quasar'
import ToggleFilters from 'src/components/global/ToggleFilter.vue'
import { QCalendarScheduler, today } from '@quasar/quasar-ui-qcalendar/'
import type { IFilterOption } from 'src/view-model'
import cfg from 'src/config'
import type { IVacationData } from '@kedo-team/data-model'

const {result, loading, error} = cfg.providers.unitVacation.getUnitsVacation()

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

const viewModel = ref('week')
function filterChanged(val: string) {
  viewModel.value = val
}

function getEvents (scope: any): IVacationData[] {
  const vacations: IVacationData[] = scope.resource.vacationsList;
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
  const targetDate = tryParseDate(target) 
  const startDate = tryParseDate(startRange)
  const endDate   = tryParseDate(endRange)

  const opts = {
    inclusiveFrom: true,
    inclusiveTo: true,
    onlyDate: true
  }
  return date.isBetweenDates(targetDate, startDate, endDate, opts) 
}

function tryParseDate(strVal: string): Date {
  const date = new Date(Date.parse(strVal))
  if (!date) throw new Error(`Cannot parse date: ${date}`)
  return date
}

function getEventLeft(scope: any, event: IVacationData): string {
  // event.dow = Это насколько от левой даты начинается отпуск

  // 1 вычисляем с какого индекса стартовать отрисовку (0 - первый)
  const eventFromDate = tryParseDate(event.payload.dateFrom)
  const scheduleFromDate = tryParseDate(scope.days[0].date)
  // https://quasar.dev/quasar-utils/date-utils#difference
  const difference = date.getDateDiff(eventFromDate, scheduleFromDate, 'days')
  const left = difference < 0 ? 0 : difference *
               parseFloat(scope.cellWidth)
  const retVal = left + (scope.cellWidth.endsWith('%') ? '%' : 'px')
  return retVal
}

function getEventWidth(scope: any, event: IVacationData): string {
  // RANGE = продолжитльность в днях
  // const width = (event.range ? event.range : 2) * parseFloat(scope.cellWidth)
  const width = 2 * parseFloat(scope.cellWidth)
  const val = width + (scope.cellWidth.endsWith('%') ? '%' : 'px')
  return val  
}

function  getStyle (scope: any, event: IVacationData) {
      return {
        position: 'absolute',
        background: 'white',
        left: getEventLeft(scope, event),
        width: getEventWidth(scope, event)
      }
}

</script>