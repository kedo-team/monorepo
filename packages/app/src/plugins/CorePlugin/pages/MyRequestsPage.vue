<template lang="pug">
.column
  q-btn-toggle.q-pa-md.justify-center(v-model='toggleFilter'
                                        push
                                        glossy
                                        toggle-color="primary"
                                        :options='toggleOptions')
  //- TODO: Вот эту проверку нужно отсюда убрать. И все объекты возвращаемые apollo перенести в SmartTable
  //- TODO: все объекты возвращаемые apollo перенести в SmartTable
  //- TODO: Как-то нужно выводить типы и таблицы из query
  KT-SmartTable(v-if='result'
                :columns='columns'
                :columnsDefinition='columnDefinition'
                :templateDefinition='templateDefinition'              
                :result='result'
                :loading='loading'
                :error='error'
                )
  
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import type { QTableColumnDefinition, SlotTemplateDefinition } from 'src/quasar'
// import RequestAll from './queries/Request.all.graphql'
// import RequestDone from './queries/Request.done.graphql'
// import RequestInProgress from './queries/Request.undone.graphql'
import type { DocumentNode } from 'graphql'
import cfg from 'src/config';

const columns = ['createdAt', 'status']
const columnDefinition: QTableColumnDefinition[] = [{
            name: 'requestTypeName',
            align: 'center',
            label: 'Описание',
            field: 'requestTypeName',
            format: (val, row) => row
}]

const templateDefinition: SlotTemplateDefinition[] = [{
    slot: 'requestTypeName',
    component: 'KT-RequestTitle'
}]
// const columnDefinition = 

const toggleOptions = [
          {label: 'Все', value: 'all'},
          {label: 'Выполненные', value: 'done'},
          {label: 'Текущие невыполненные', value: 'in_progress'}
          ]

const toggleFilter = ref('all')

const { result, loading, error } = cfg.providers.request.getUserRequests()

// function getQuery(filter: any): DocumentNode {
//   switch(filter.value) {
//     case 'all': return RequestAll;
//     case 'done': return RequestDone;
//     case 'in_porgress': return RequestInProgress;
//     default: return RequestAll;
//   }
// }

// const { result, loading, error} = useQuery(
//                                     () => { return getQuery(toggleFilter) }                                  
//                                  )

</script>