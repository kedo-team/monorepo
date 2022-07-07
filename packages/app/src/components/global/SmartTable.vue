<template lang="pug">
q-table(v-if='result'
        :columns = 'resColDef',
        :rows="result"
        row-key='id'
        )

    //- LOADING
    template(#loading)
      q-inner-loading(showing color="primary")

    template(v-for='template in resTmplDef'
            #[`body-cell-${template.slot}`]='props')
      q-td(:props="props")
        component(:key='template.slot' :is='template.component', :data="props.value")
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { QTableColumnDefinition, SlotTemplateDefinition } from 'src/quasar'
import { getQTableColumnDefinition,
         getQTableTemplateDefinition } from '../../utils/col-definition-helper'

const isHandleClick = 'row-click'
//computed(()=>props.itemClick ? 'row-click': null)

const props = defineProps<{
  // TODO: Как это сделать без импорта? И есть ли реальная двойная загрузка .d.ts
  columns?: string[]
  columnsDefinition?: QTableColumnDefinition[]
  templateDefinition?: SlotTemplateDefinition[]
  result: any
  loading: boolean
  error: any
  itemClick?: (id: string)=>void
}>()

const resColDef  = ref<QTableColumnDefinition[]>([])
const resTmplDef = ref<SlotTemplateDefinition[]>([])
// conditional bind to underline events
const eventsModel = {
  'row-click': rowClicked
}

if (!props.columns && !props.columnsDefinition)
  throw new Error('No columns defined')

// fill with generated columnd first
if (props.columns !== undefined) {
  resColDef.value = getQTableColumnDefinition(props.columns)
  resTmplDef.value = getQTableTemplateDefinition(props.columns)
}
// then update with custom definitions
if (props.columnsDefinition) {
  resColDef.value = [...resColDef.value, ...props.columnsDefinition]
}

if (props.templateDefinition) {
  resTmplDef.value = [...resTmplDef.value, ...props.templateDefinition]
}

function rowClicked(e, row, index) {
  console.log(row)
}

</script>
