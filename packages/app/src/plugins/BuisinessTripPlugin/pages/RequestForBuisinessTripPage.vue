<template lang="pug">
.row.justify-end
  .col-auto
    q-btn(flat @click='schedule_visibility = !schedule_visibility'
          :label="getScheduleBtnLabel(schedule_visibility)")

.column.justify-center
  .col.q-pb-md
     q-slide-transition
        q-card(v-show='schedule_visibility'): q-card-section
          OrgSchedule

q-form(@submit='confirmDialog = true'
       greedy)
  .column.justify-center
    .row.q-gutter-md.justify-center
      .column
        q-card
          q-card-section
            .text-h6.text-center Даты командировки
          q-separator(inset)
          q-card-section
            RangeCalendar(v-model='dateRangeModel'
                          :restrictTo='0')
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
                KT-ButtonToggle(:options='compensationOptions',
                            v-model='model.compensationType'
                            :disable="!isFreeDaysInside()")

                //- q-btn-toggle(push glossy toggle-color="primary"
                //-             v-model='model.compensationType'
                //-             :options="compensationOptions"
                //-             :disable="!isFreeDaysInside()")
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
    .row.flex-center
      q-btn(color="purple"
            type='submit') Отправить заявку


RequestConfirmationDialog(v-model='confirmDialog'
                          :request-type='requestTypeName'
                          @confirmed='submitRequest')
      q-markup-table
        thead: tr: th(colspan='2')
          .text-h6 Параметры заявки на командировку
        tbody
          tr
            td Даты командировки
            td {{ dateRangeModel.dateFrom }} - {{ dateRangeModel.dateTo }}
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


</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import * as dateUtils from 'src/utils/date'
import { useUser } from 'stores/user'
import cfg from 'src/config'
import type { IRequestType, IBuisinessTripRequest } from '@kedo-team/data-model'
import type { IDateRange, IFilterOption } from 'src/view-model'
import RangeCalendar from 'src/components/global/RangeCalendar.vue'
import OrgSchedule from 'src/components/OrgSchedule.vue'
import RequestConfirmationDialog from 'src/components/RequestConfirmationDialog.vue'

const model = reactive({
   country: '',
   goal: '',
   reason: '',
   comment: '',
   compensationType: 'freeDay'
})

const dateRangeModel = ref<IDateRange> ({
  dateFrom: '',
  dateTo: ''
})

const requestTypeName: IRequestType = 'BUISINESS_TRIP'

const compensationOptions: IFilterOption[] = [
                          {label:'Доп.входной',   value:'freeDay', default: true},
                          {label:'Оплата x2', value:'money'}
                        ]


function isFreeDaysInside(): boolean {
  if (dateRangeModel.value.dateFrom && dateRangeModel.value.dateTo)
  {
    return dateUtils.isFreeDaysInside(dateRangeModel.value.dateFrom, dateRangeModel.value.dateTo)
  }
  return false
}


const confirmDialog = ref(false)

const user = useUser()

async function submitRequest() {
  const req: IBuisinessTripRequest = {
    id: '',
    ownerUserId: user.id,
    requestTypeName,
    comment: model.comment,
    status: 'PENDING',
    createdAt: new Date().toDateString(),
    payload: {
      dateFrom: dateRangeModel.value.dateFrom,
      dateTo: dateRangeModel.value.dateTo,
      target: model.country,
      goal: model.goal,
      reason: model.reason
    }
  }
  cfg.providers.buisinessTrip.sendRequest(req)
}

const schedule_visibility = ref(true)
function getScheduleBtnLabel(isVisible: boolean): string {
  return isVisible ? 'скрыть календарь' : 'показать календарь'
}
</script>
