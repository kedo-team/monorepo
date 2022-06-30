<template lang="pug">
q-btn-toggle(:options='props.options'
            v-model='model'
            push
            glossy
            toggle-color='primary')
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IFilterOption } from 'src/view-model'

const props = defineProps<{
  options: IFilterOption[]
}>()

const emit = defineEmits(['changed'])

// setting default value
const defValue = props.options.find(el => el.default ?? false)
const model = ref(defValue ?? props.options[0].value)
// watch for changed and emit event
watch (model, () => {
  emit('changed', model.value)
})


</script>