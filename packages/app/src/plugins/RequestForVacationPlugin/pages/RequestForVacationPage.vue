<template lang="pug">


q-form(@submit="submit")
  .column.justify-center
    .col.q-pb-md
      q-card: q-card-section
        OrgSchedule
    
    .row.q-gutter-md.justify-center
      .column
        q-card
          q-card-section
            .text-h6.text-center Даты отпуска
          q-separator(inset)
          q-card-section
            q-date.col(v-model="model.dates"
                :locale='datei18n'
                today-btn
                first-day-of-week="1"
                range
                :options='dateGuard')
      .col-6
        .column.q-gutter-md
          .row.justify-center
            .col.q-pr-md: q-card
                q-card-section.text-center Остаток дней отпуска
                  | #[br] #[b на сегодня]
                q-separator
                q-card-section.flex.flex-center(style="fontSize: 24px")
                  div(v-if='vacBalance.loading.value')
                    q-spinner-tail
                  div(v-if='vacBalance.result.value') {{ vacBalance.result }}
            .col: q-card
                q-card-section.text-center Остаток дней отпуска
                  | #[br] #[b на {{ strFirstVacationDay }}]
                q-separator
                q-card-section.flex.flex-center(style="fontSize: 24px")
                  div(v-if='vacFuturetureBalance.loading.value')
                    q-spinner-tail
                  div(v-if='vacFuturetureBalance.result.value') {{ vacFuturetureBalance.result }}
          //- vacation type block
          q-card
            q-card-section
              .text-h6.text-center Тип отпуска
                q-badge(align='top'
                        rounded
                        color='blue') i
                  q-tooltip
                    div Ежегодный отпуск оплачивается по закондательству, в зависимости от вашего среднего заработка.
                    div Отпуск за свой счет не оплачивается.
            q-separator(inset)
            q-card-section
              .row.justify-center
                q-btn-toggle(push glossy toggle-color="primary"
                            v-model='model.isPayed'
                            :options="vacationType")

          q-card
            q-card-section
              .column
                //- q-input(filled
                //-         label='Страна и город'
                //-         v-model='model.country'
                //-         :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                //-   template(#prepend)
                //-     q-icon(name='place')
                //- q-input(filled
                //-         label='Цель поездки'
                //-         v-model='model.goal'
                //-         :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                //- q-input(filled
                //-         label='Основание для поездки'
                //-         v-model='model.reason'
                //-         :rules="[val => !!val || 'Это поле обязательно нужно заполнить']")
                q-input(filled
                        label='Комментарий'
                        v-model='model.comment'
                        type='textarea')
    .row.flex-center
      q-btn(color="purple"
            @click='confirmDialog=true'
            type='submit') Отправить заявку


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
        //- tbody
        //-   tr
        //-     td Даты командировки
        //-     td {{ model.dates.from }} - {{ model.dates.to }}
        //-   tr(v-if='isFreeDaysInside()')
        //-     td Вид компенсации за выходные дни:
        //-     td
        //-       div(v-if="model.compensationType == 'money'") Оплата в двойном размере
        //-       div(v-if="model.compensationType == 'freeDay'") Дополнительные оплачиваемые выходные
        //-   tr
        //-     td Место командирования
        //-     td {{ model.country }}
        //-   tr
        //-     td Цель поездки
        //-     td {{ model.goal }}
        //-   tr
        //-     td Основание поездки
        //-     td {{ model.reason }}
        //-   tr(v-if="model.comment != ''")
        //-     td Дополнительный комментарий
        //-     td {{ model.comment }}

    q-card-actions(align='right')
      q-btn(flat label='Отменить' color='primary' v-close-popup)
      q-btn(flat label='Подтвердить' color='primary' v-close-popup, @click="submit")

</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { date as quasarDateUtil } from 'quasar'
import { datei18n } from '../../../utils/quasar-i18n'
import * as dateUtils from 'src/utils/date'
import OrgSchedule from 'src/components/OrgSchedule.vue'
import cfg from 'src/config'

const vacationType = [
  {label:'Ежегодный (оплачиваемый)',   value:'true'},
  {label:'За свой счет',  value:'false'}
]

const confirmDialog = ref(false)
const model = reactive({
  dates: {
    from: '2022/07/14',
    to: '2022/07/28',
  },
  isPayed: true,
  comment: ''
})


const getFirstVacationDate = computed(()=>{
  if (!model.dates) return null
  const strDate = model.dates.from ?? <string><unknown>model.dates
  return strDate
})

const strFirstVacationDay = computed(()=>{
  const strDate = getFirstVacationDate
  if (!strDate) return '--'
  return dateUtils.formatRuDate(strDate.value)
})

const vacBalance = cfg.providers.unitVacation.getVacationBalance()
const vacFuturetureBalance = cfg.providers.unitVacation.getVacationBalanceOnDate(getFirstVacationDate)

function submit() {
  throw Error('not defined')
}

function dateGuard (date) {
  const dateDiff = quasarDateUtil.getDateDiff(date, Date.now())
  console.log(date)
  console.log(dateDiff)
  return dateDiff >= 14
}

</script>
