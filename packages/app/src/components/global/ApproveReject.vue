<template lang="pug">
.row.justify-center.q-gutter-x-sm
    q-btn(round 
          color="green" 
          icon="thumb_up"
          :size='btnSize'
          @click="doTask('approve', data)")
        q-tooltip Принять текущую задачу
    q-btn(round 
          color="deep-orange" 
          icon="thumb_down"
          :size='btnSize'
          @click="doTask('reject', data)")
        q-tooltip отклонить текущую задачу
</template>
<script setup lang="ts">
import { ref } from 'vue'
const btnSize = ref('sm')

function doTask(action: string, id: string) {
    alert(`${action} id: ${id}`)
}

defineProps<{
    data: string
}>()
</script>