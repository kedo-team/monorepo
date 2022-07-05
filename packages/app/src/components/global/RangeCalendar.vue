<template lang='pug'>
q-field(stack-label
        :rules='[validator]'
        no-error-icon
        :hide-bottom-space='true'
        :bottom-slots='true')
  //- template(#control)
  .kt-calendar: q-date(v-model='qModel'
        :locale='datei18n'
        today-btn
        first-day-of-week='1'
        range
        v-bind='options')
</template>
<style scoped lang='sass'>
.kt-calendar
  color: $primary

</style>

<script setup lang='ts'>
import { date as quasarDateUtil } from 'quasar'
import { ref, watch } from 'vue'
import { datei18n } from 'src/utils/quasar-i18n'
import type { IDateRange } from 'src/view-model'

// native quasar calendar v-model
const qModel = ref< QuasarCalendarModel | string >('')
type QuasarCalendarModel = {
      from: string
      to:   string
    } | string

const props = defineProps<{
  modelValue: IDateRange
  restrictTo?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IDateRange)
}>()

watch(qModel, (newVal: QuasarCalendarModel) => {
  // if we click inside selected range quasar emit update event with null
  if (!newVal) return

  let  retValue: IDateRange = null
  if (typeof newVal === 'string' ||
      newVal instanceof String) {
    // one date range
    retValue = {
      dateFrom: <string>newVal,
      dateTo: <string>newVal
    }
  } else {
      //multidate range
      retValue = {
        dateFrom: newVal.from,
        dateTo: newVal.to
      }
  }
  emit('update:modelValue', retValue)
})

const options = {
  // initializing guard only if restricTo prop passed
  options: guardFactory()
}

function guardFactory() {
  if (props.restrictTo) {
    return function (date) {
              const dateDiff = quasarDateUtil.getDateDiff(date, Date.now())
              return dateDiff >= props.restrictTo
            }
  }

  return undefined
}

function validator(): boolean | string {

  if (qModel.value == '')
    return 'Выберите дату или диапазон дат'
  else
    return true

}

</script>