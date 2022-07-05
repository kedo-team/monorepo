<template lang='pug'>
q-dialog(v-model='modelValue'
        @update:model-value='val => emit("update:modelValue", val)')
  q-card
    q-card-section.row.items-center
      q-avatar(icon='work' color='negative' text-color='white')
      .q-ml-sm.text-h6 Подтвердите направление заявки
    q-card-section
      slot
        div missing slot
    q-card-section.column
      .col Маршрут согласования:
      .col
        .row.justify-center.flex-center
          .col-auto
            q-icon(name='start')
          template(v-for='(user, index) in approvementRoute')
            .col.text-center
              KT-UserAvatar(:data='user')
            .col-auto.text-center(v-if='index < approvementRoute.length-1')
              q-icon(name='arrow_right_alt')
          .col-auto.text-center
            q-icon(name='keyboard_tab')

    q-card-actions(align='right')
      q-btn(outline label='Отменить' color='red' @click='cancel')
      q-btn(outline label='Подтвердить' color='green' @click='submit')

</template>
<script setup lang='ts'>
import type { IRequestType } from '@kedo-team/data-model';
import cfg from 'src/config';


const props = defineProps<{
  modelValue: boolean
  requestType: IRequestType
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean)
  (e: 'confirmed')
}>()

function cancel() {
  emit("update:modelValue", false)
}

function submit() {
  emit("update:modelValue", false)
   emit("confirmed")
}

const approvementRoute = cfg.providers.request.getApprovementRoute(props.requestType)
</script>