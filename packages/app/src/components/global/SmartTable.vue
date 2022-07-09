<template lang="pug">
q-table(v-if='result'
        :columns = 'resColDef',
        :rows="result"
        row-key='id'
        v-on='eventModel'
        )

    //- LOADING
    template(#loading)
      q-inner-loading(showing color="primary")

    template(v-for='template in resTmplDef'
            #[`body-cell-${template.slot}`]='props')
      q-td(:props="props")
        component(:key='template.slot'
                  :is='template.component'
                  :data="props.value"
                  v-on='getComponentBindingEvent(template.component)')
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { QTableColumnDefinition, SlotTemplateDefinition } from 'src/quasar'
import { getQTableColumnDefinition,
         getQTableTemplateDefinition } from '../../utils/col-definition-helper'


const props = defineProps<{
  // TODO: Как это сделать без импорта? И есть ли реальная двойная загрузка .d.ts
  columns?: string[]
  columnsDefinition?: QTableColumnDefinition[]
  templateDefinition?: SlotTemplateDefinition[]
  result: any
  loading: boolean
  error: any
  isRowClickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'item-click',   item: string)
  (e: 'item-approve', item: string)
  (e: 'item-reject',  item: string)
}>()

const resColDef  = ref<QTableColumnDefinition[]>([])
const resTmplDef = ref<SlotTemplateDefinition[]>([])

// conditional bind to underline events
// docs: https://stackoverflow.com/questions/48042274/conditional-event-binding-vuejs
const eventModel = getEventBindingObject()
function getEventBindingObject() {
  const obj = {
    rowClick: props.isRowClickable ? (e, item ) => emit('item-click', item) : null
  }
  return obj
}
// the same for approve/reject component
function getComponentBindingEvent(componentName: string) {
  function findItem(id) {
    return props.result.find(item => item.id === id)
  }

  // we need to return empty object if else vue will warn in console
  if (componentName !== 'KT-ApproveReject') return {}
  const obj = {
    itemApprove: (id: string) => emit('item-approve', findItem(id)),
    itemReject:  (id: string) => emit('item-reject',  findItem(id)),
  }
  return obj
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

</script>
