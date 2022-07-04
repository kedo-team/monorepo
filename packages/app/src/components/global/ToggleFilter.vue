<template lang="pug">
q-btn-toggle(:options='props.options'
            v-model='btnModel'
            push
            glossy
            toggle-color='primary'
            @update:model-value='updateModel')
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IFilterOption } from 'src/view-model'

const props = defineProps<{
  modelValue: any
  options: IFilterOption[]
}>()

const defOpt = props.options.find(o=>o.default)
const defValue = defOpt ? defOpt.value : props.options[0].value

const btnModel = ref(defValue)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any)
}>()

function updateModel(newVal) {
  emit("update:modelValue", newVal)
}

</script>