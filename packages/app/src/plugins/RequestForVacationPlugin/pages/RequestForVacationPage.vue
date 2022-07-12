<template lang='pug'>

.row.justify-end
  .col-auto
    q-btn(flat @click='schedule_visibility = !schedule_visibility'
          :label="getScheduleBtnLabel(schedule_visibility)")

.column.justify-center
  .col.q-pb-md
      q-slide-transition
        q-card(v-show='schedule_visibility'): q-card-section
          OrgSchedule

  q-form.column(@submit='confirmDialog = true'
                greedy)
    .col.row.q-gutter-md.justify-center
      .column
        q-card
          q-card-section
            .text-h6.text-center Даты отпуска
          q-separator(inset)
          q-card-section
            RangeCalendar(v-model='dateRangeModel'
                          :restrictTo='14')
      .col-6
        .column.q-gutter-md
          .row.justify-center
            .col.q-pr-md: q-card
                q-card-section.text-center Остаток дней отпуска
                  | #[br] #[b на сегодня]
                q-separator
                q-card-section.flex.flex-center(style="fontSize: 24px")
                  //- div(v-if='vacBalance.loading.value')
                  //-   q-spinner-tail
                  div(v-if='vacBalance') {{ vacBalance }}
            .col: q-card
                q-card-section.text-center Остаток дней отпуска
                  | #[br] #[b на {{ dateUtils.formatRuDate(dateRangeModel.dateFrom) }}]
                q-separator
                q-card-section.flex.flex-center(style="fontSize: 24px")
                  div(v-if='vacFuturetureBalance.loading.value')
                    q-spinner-tail
                  div(v-else-if='vacFuturetureBalance.result.value') {{ vacFuturetureBalance.result }}
                  div(v-else) --
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
                KT-ButtonToggle(:options='vacationType',
                            v-model='model.isPayed')

          q-card
            q-card-section
              .column
                q-input(filled
                        label='Комментарий'
                        v-model='model.comment'
                        type='textarea')
    .col.row.flex-center
      q-btn(color='purple'
            type='submit') Отправить заявку

RequestConfirmationDialog(v-model='confirmDialog'
                          :request-type='requestTypeName'
                          @confirmed='submitRequest')
  q-markup-table
    thead: tr: th(colspan='2')
      .text-h6 Параметры заявки на Отпуск
    tbody
      tr
        td Тип отпуска
        td {{ model.isPayed ? 'Ежегодный оплачиваемый' : 'За свой счет (неоплачиваемый)' }}
      tr
        td Даты отпуска
        td
          .column
            .col {{ dateUtils.formatRuDate(dateRangeModel.dateFrom) }} -
              |  {{ dateUtils.formatRuDate(dateRangeModel.dateTo) }}
            .col Общая длительность: #[b {{ quasarDateUtil.getDateDiff(dateRangeModel.dateTo, dateRangeModel.dateFrom, 'days') + 1 }} дн.]

      tr(v-if="model.comment != ''")
        td Дополнительный комментарий
        td {{ model.comment }}

</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch , unref, toRef} from 'vue'
import { date as quasarDateUtil } from 'quasar'
import * as dateUtils from 'src/utils/date'
import OrgSchedule from 'src/components/OrgSchedule.vue'
import type { IRequestType, IVacationRequest } from '@kedo-team/data-model'
import RangeCalendar from 'src/components/global/RangeCalendar.vue'
import RequestConfirmationDialog from 'src/components/RequestConfirmationDialog.vue'
import cfg from 'src/config'
import type { IDateRange, IFilterOption } from 'src/view-model'

const vacationType: IFilterOption[] = [
  {label:'Ежегодный (оплачиваемый)',   value:'true', default: true},
  {label:'За свой счет',  value:'false'}
]

const dateRangeModel = ref<IDateRange> ({
  dateFrom: '',
  dateTo: ''
})

const confirmDialog = ref(false)
const model = reactive({
  isPayed: true,
  comment: ''
})

const vacProvider = cfg.providers.unitVacation
const reqProvider = cfg.providers.request
const vacBalance = vacProvider.getVacationBalance
const firstVacaltionDate = ref('')
const vacFuturetureBalance = vacProvider.getVacationBalanceOnDate(firstVacaltionDate)

watch(dateRangeModel, newVal => {
  firstVacaltionDate.value = newVal.dateFrom
})

const requestTypeName: IRequestType = 'VACATION'

function submitRequest(e) {

  const request: IVacationRequest = {
    id: '',
    createdAt: '',
    ownerUserId: '',
    requestTypeName,
    status: 'PENDING',
    comment: model.comment,
    payload: { ...unref(dateRangeModel), ...{isPayed: model.isPayed}}
  }
  reqProvider.registerRequest(request)
}

const schedule_visibility = ref(true)
function getScheduleBtnLabel(isVisible: boolean): string {
  return isVisible ? 'скрыть календарь' : 'показать календарь'
}
</script>
