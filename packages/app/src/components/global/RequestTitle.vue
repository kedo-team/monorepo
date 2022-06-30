<template lang="pug">
.row.col-md-auto.justify-center
  .column(v-if='data.requestTypeName == "VACATION"')
    q-chip(outline
      icon='cake'
      color='orange'
      text-color='white'
      :size='size') Отпуск
    div(v-if='data.payload') c:  {{ data.payload.dateFrom }}
    div(v-if='data.payload') по: {{ data.payload.dateTo  }}

</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { IVacationRequest } from '@kedo-team/data-model'
const size = ref('sm')

const props = defineProps<{
    data: IVacationRequest
}>()


</script>