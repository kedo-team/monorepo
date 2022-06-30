<template lang="pug">
OrgSchedule

//- q-splitter(v-model='splitterModel'
//-           )

//- q-splitter(v-model='splitterModel')
//-   template(#before)
//-     .column.q-pa-md.q-gutter-y-md
//-       .row
//-         q-radio(label="Ежегодный"
//-                 v-model='checkboxModel'              
//-                 unchecked-icon="panorama_fish_eye"
//-                 size='xl'
//-                 val="true")
//-         q-radio(label="За свой счет"
//-                 v-model='checkboxModel'              
//-                 unchecked-icon="panorama_fish_eye"
//-                 size='xl'
//-                 val="false")
//-       q-date(v-model="calendarModel"
//-             :locale='datei18n'
//-             today-btn
//-             first-day-of-week="1"
//-             range)
//-   template(#after)
//-     .column.q-pa-md.q-gutter-y-md
//-       .text-h6 Доступно на начало отпуска: {{ 18 }} дней
//-       q-markup-table
//-         thead: tr: th(colspan='2') 
//-               .text-h4 Параметры заявки на отпуск:
//-         tbody
//-           tr
//-             td Тип:
//-             td Отпуск за свой счет
//-           tr
//-             td Дата начала:
//-             td {{ calendarModel.from }}
//-           tr
//-             td Дата окончания:
//-             td {{ calendarModel.to }}
//-           tr
//-             td Продолжительность:
//-             td {{ vacationDuration }}
//-           tr
//-             td Согласующий руководитель:
//-             td: q-chip
//-               q-avatar: img(src='https://cdn.quasar.dev/img/avatar5.jpg')
//-               | Толкачев Антон
//-       .row.justify-start
//-         q-btn(color="purple"
//-               @click='confirmDialog=true') Отправить заявку

//- q-dialog(v-model='confirmDialog'
//-         persistent)
//-   q-card
//-     q-card-section.row.items-center
//-       q-avatar(icon='signal_wifi_off' color='primary' text-color='white')
//-       span.q-ml-sm Подтвердите направление заявки
//-     q-card-actions(align='right')
//-       q-btn(flat label='Отменить' color='primary' v-close-popup)
//-       q-btn(flat label='Подтвердить' color='primary' v-close-popup, @click="submit")  

//- pre {{ calendarModel }}
//- q-btn(@click="debug") debug
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { date } from 'quasar'
// import { ActionsProvider } from 'src/data-model/data-provider'
import { datei18n } from '../../../utils/quasar-i18n'
import { useUser } from 'stores/user'
import OrgSchedule from 'src/components/OrgSchedule.vue'
import pino from 'pino'

// const log = pino({browser:{asObject: true}})
// const instance = getCurrentInstance()

// const form = ref(null)

// const calendarModel = ref({
//   from: '2022/05/31',
//   to: '2022/06/07'
// })
// const checkboxModel = ref('true')

// const splitterModel = ref(30);

// const vacationDuration = computed(()=>{
//   const startDate = new Date(calendarModel.value.from)
//   const endDate = new Date(calendarModel.value.to)
//   const diff = date.getDateDiff(endDate, startDate, 'days')

//   return diff + 1;
// })

// const confirmDialog = ref(false)

// function debug() {
  
//   log.warn({"current": instance}, 'hi from pino')

//   // console.log(vacationRequest)
// }

// const user = useUser()

// async function submit() {
//   const res = await ActionsProvider.createRequest({
//     requestTypeName: "VACATION",
//     payload: {
//       dateFrom: calendarModel.value.from,
//       dateTo:   calendarModel.value.to,
//       isPayed:  checkboxModel.value === 'true'
//     }
//   })
//   console.log(res)
// }

</script>
