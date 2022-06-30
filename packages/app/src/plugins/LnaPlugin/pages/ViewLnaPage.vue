<template lang="pug">
h1 Просмотр ЛНА
h5 {{ user.jwt }}
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { useUser } from '../../../stores/user'

const user = useUser();

</script>
