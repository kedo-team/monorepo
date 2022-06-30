<template lang="pug">

q-icon(v-if='data'
       name='visibility'
       :size='size')
q-icon(v-else
       name='visibility_off'
       :size='size')

</template>
<script setup lang="ts">
import { ref } from 'vue'
const size=ref('md')

defineProps<{
    data: boolean
}>()
</script>