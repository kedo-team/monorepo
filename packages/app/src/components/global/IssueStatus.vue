<template lang="pug">
q-badge(v-if='data=="IN_PROGRESS"'
        color='amber') в процессе
    q-tooltip Ожидает действия от пользователя

q-badge(v-if='data=="APPROVED"'
        color='green') выполнена
    q-tooltip Выполнено успешно!
q-badge(v-if='data=="REJECTED"'
        color='red') отклонена
    q-tooltip Отклонено адресатом :(

</template>
<script setup lang="ts">
const props = defineProps({
    data: String
})
</script>