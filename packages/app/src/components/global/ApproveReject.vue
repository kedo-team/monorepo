<template lang="pug">
.row.justify-center.q-gutter-x-sm
    q-btn(round
          color="deep-orange"
          icon="thumb_down"
          :size='btnSize'
          @click.stop='emit("item-reject", data)')
        q-tooltip отклонить текущую задачу
    q-btn(round
          color="green"
          icon="thumb_up"
          :size='btnSize'
          @click.stop='emit("item-approve", data)')
        q-tooltip Принять текущую задачу
</template>
<script setup lang="ts">
import { ref } from 'vue'

const btnSize = ref('sm')
const emit = defineEmits<{
    (e: 'item-approve', item: string),
    (e: 'item-reject', item: string)
}>()

defineProps<{
    data: string
}>()

</script>