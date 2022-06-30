<template lang="pug">
q-chip
    q-avatar: img(:src='data.avatarUrl')
    | {{ data.firstName }} {{ data.lastName }}
    q-tooltip
        .row
            div email: 
            div {{ data.email }}
        .row 
            div phone:
            div {{ data.phone }}
</template>
<script setup lang="ts">
import type { IUser } from '@kedo-team/data-model'

defineProps<{
    data: IUser
}>()
</script>