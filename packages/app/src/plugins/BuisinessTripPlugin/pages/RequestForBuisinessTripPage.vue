<template lang="pug">


q-form(@submit="submit")
  .column.justify-center
    .row.q-gutter-md.justify-center
      .column
        q-card
          q-card-section
            .text-h6.text-center Даты командировки
          q-separator(inset)
          q-card-section
            q-date.col(v-model="model.dates"
                :locale='datei18n'
                today-btn
                first-day-of-week="1"
                range)
      .col-6
        .column.q-gutter-md
          q-card
            q-card-section
              .text-h6.text-center Вид компенсации за выходные дни
                q-badge(align='top'
                        rounded
                        color='blue') i
                  q-tooltip
                    div Командировка, приходящаяся на выходной или праздничный день должны быть либо компенсированы днем отгула, либо оплачены в двойном объеме.
                    div Выбор типа компенсации доступен только если выбранные дни приходятся на выходные.
            q-separator(inset)
            q-card-section
              .row.justify-center
                q-btn-toggle(push glossy toggle-color="primary"
                            v-model='model.compensationType'
                            :options="compensationOptions"
                            :disable="!isFreeDaysInside()")
          q-card
            q-card-section
              .column
                q-input(filled
                        label='Страна и город'
                        v-model='model.country'
                        :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                  template(#prepend)
                    q-icon(name='place')
                q-input(filled
                        label='Цель поездки'
                        v-model='model.goal'
                        :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                q-input(filled
                        label='Основание для поездки'
                        v-model='model.reason'
                        :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                q-input(filled
                        label='Комментарий'
                        v-model='model.comment'
                        type='textarea')
    .row.justify-center
      q-btn(color="purple"
            @click='confirmDialog=true'
            type='submit') Отправить заявку
  //- template(#after)
  //-   .column.q-pa-md.q-gutter-y-md
  //-     q-markup-table
  //-       thead: tr: th(colspan='2') 
  //-             .text-h4 Параметры заявления на командировку:
  //-       tbody
  //-         tr
  //-           td Тип:
  //-           td Отпуск за свой счет
  //-         tr
  //-           td Дата начала:
  //-           td {{ calendarModel.from }}
  //-         tr
  //-           td Дата окончания:
  //-           td {{ calendarModel.to }}
  //-         tr
  //-           td Продолжительность:
  //-           td {{ vacationDuration }}
  //-         tr
  //-           td Согласующий руководитель:
  //-           td: q-chip
  //-             q-avatar: img(src='https://cdn.quasar.dev/img/avatar5.jpg')
  //-             | Толкачев Антон
  //-     .row.justify-start
  //-       q-btn(color="purple"
  //-             @click='confirmDialog=true') Отправить заявку

q-dialog(v-model='confirmDialog'
        persistent)
  q-card
    q-card-section.row.items-center
      q-avatar(icon='work' color='negative' text-color='white')
      .q-ml-sm.text-h6 Подтвердите направление заявки
    q-card-section
      q-markup-table
        //- thead: tr: th(colspan='2')
        //-   .text-h6 Проверьте параметры заявки на командировку
        tbody
          tr
            td Даты командировки
            td {{ model.dates.from }} - {{ model.dates.to }}
          tr(v-if='isFreeDaysInside()')
            td Вид компенсации за выходные дни:
            td
              div(v-if="model.compensationType == 'money'") Оплата в двойном размере
              div(v-if="model.compensationType == 'freeDay'") Дополнительные оплачиваемые выходные
          tr
            td Место командирования
            td {{ model.country }}
          tr
            td Цель поездки
            td {{ model.goal }}
          tr
            td Основание поездки
            td {{ model.reason }}
          tr(v-if="model.comment != ''")
            td Дополнительный комментарий
            td {{ model.comment }}

    q-card-actions(align='right')
      q-btn(flat label='Отменить' color='primary' v-close-popup)
      q-btn(flat label='Подтвердить' color='primary' v-close-popup, @click="submit")

q-btn(@click="confirmDialog = true") Диалог
//- pre {{ calendarModel }}
//- q-btn(@click="debug") debug
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { date } from 'quasar'
import { datei18n } from '../../../utils/quasar-i18n'
import { useUser } from 'stores/user'

const model = reactive({
   country: '',
   goal: '',
   reason: '',
   comment: '',
   compensationType: 'freeDay',
   dates:{
     from: '',
     to: ''
   }
})

const compensationOptions = [
                          {label:'Доп.входной',   value:'freeDay'},
                          {label:'Оплата x2', value:'money'}
                        ]


function isFreeDaysInside(): boolean {
  console.log('reading model', model.dates)
  if (!model.dates) return false;
  if (typeof (model.dates) === 'string') {
    const retVal = isDayOff(new Date(model.dates))
    console.log('check one day', retVal)
    return retVal
  }

  if (!model.dates.from && !model.dates.to)
    return false;

  let currentDate = date.subtractFromDate(new Date(model.dates.from), {days: 1})
  const endDate = new Date(model.dates.to)
  
  do {
    
    currentDate = date.addToDate(currentDate, {days: 1})

    const found = isDayOff(currentDate)
    console.log(currentDate, found)
    if (found) return true    
  } while (date.isSameDate(currentDate, endDate) == false)

  return false
}

function isDayOff(d: Date): boolean {
  const dow = date.getDayOfWeek(d)
  return [6, 7].includes(dow)
}

const confirmDialog = ref(false)

const user = useUser()

async function submit() {
  console.log(model)
  // const res = await ActionsProvider.createRequest({
  //   requestTypeName: "VACATION",
  //   payload: {
  //     dateFrom: calendarModel.value.from,
  //     dateTo:   calendarModel.value.to,
  //     isPayed:  checkboxModel.value === 'true'
  //   }
  // })
  // console.log(res)
}

</script>
