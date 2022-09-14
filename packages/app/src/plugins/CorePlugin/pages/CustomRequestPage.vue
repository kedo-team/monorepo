<template lang="pug">
q-form(@submit='confirmDialog = true'
       greedy)
  .row
    .col
      q-input(filled
              label='текст заявки'
              v-model='model.comment'
              type='textarea')
  .row.flex-center.q-pa-md
    q-btn(color="purple"
          type='submit') Отправить заявку

RequestConfirmationDialog(v-model='confirmDialog'
                          request-type='BUISINESS_TRIP'
                          @confirmed='submitRequest')
  q-markup-table
    thead: tr: th(colspan='2')
      .text-h6 Заявка в свободной форме
    tbody
      tr
        td текст
        td {{ model.comment }}

</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import RequestConfirmationDialog from 'src/components/RequestConfirmationDialog.vue'

const model = reactive({
  country: '',
  goal: '',
  reason: '',
  comment: '',
  compensationType: 'freeDay'
})

const confirmDialog = ref(false)

async function submitRequest() {
  return true
}

</script>