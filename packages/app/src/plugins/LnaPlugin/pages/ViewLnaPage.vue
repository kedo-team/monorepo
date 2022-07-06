<template lang="pug">
.row.flex-center
  .col-auto
    q-img(src='/under-construction.png' fit='fill'
          width='200px'
          height='200px')
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { useUser } from '../../../stores/user'

const user = useUser();

</script>
