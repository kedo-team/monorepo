<template lang="pug">
.column.items-center
  .col.q-pb-md:  KT-ButtonToggle(v-model='toggleFilter'
                    :options='toggleOptions')
  .col-auto: KT-SmartTable(
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
import type { QTableColumnDefinition, SlotTemplateDefinition } from 'src/quasar'
import cfg from 'src/config'
import type { IFilterOption, IStatusViewModel } from 'src/view-model'

const columns = ['createdAt', 'status']
const columnDefinition: QTableColumnDefinition[] = [{
  name: 'requestTypeName',
  align: 'center',
  label: 'Описание',
  field: 'requestTypeName',
  format: (val, row) => row
},
{
  name: 'tasksList',
  align: 'center',
  label: 'Состояние согласования',
  field: 'tasksList'
}
]

const templateDefinition: SlotTemplateDefinition[] = [{
    slot: 'requestTypeName',
    component: 'KT-RequestTitle'
},
{
  slot: 'tasksList',
  component: 'KT-RequestWorflowTasks'

}
]

const toggleOptions: IFilterOption[] = [
          {label: 'Текущие в работе', value: 'IN_PROGRESS', default:true},
          {label: 'Выполненные', value: 'COMPLETED'},
          ]

const toggleFilter = ref<IStatusViewModel>('IN_PROGRESS')

const { result, loading, error } = cfg.providers.request.getUserRequests(toggleFilter)

</script>