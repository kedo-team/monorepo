<template lang="pug">
q-badge(v-if='data=="IN_PROGRESS"'
        color='amber')
  | #[q-icon(v-if='icon' name='help_outline')] #[span(v-if='badge') в процессе]
  q-tooltip Ожидает действия от пользователя

q-badge(v-if='data=="APPROVED"'
        color='green')
  | #[q-icon(v-if='icon' name='done')] #[span(v-if='badge') выполнена]
  q-tooltip Выполнено успешно!
q-badge(v-if='data=="REJECTED"'
        color='red')
  | #[q-icon(v-if='icon' name='disabled_by_default')] #[span(v-if='badge') отклонена]
  q-tooltip Отклонено адресатом :(

q-badge(v-if='data=="PENDING"'
        color='gray')
  | #[q-icon(v-if='icon' name='schedule')] #[span(v-if='badge') на очереди]
  q-tooltip Задача запланирована, но еще не значена пользователю

</template>
<script setup lang="ts">
import type { IStatusViewModel } from 'src/view-model'

/**
 *
 */
export interface IProps {
  data: IStatusViewModel
  badge?: boolean
  icon?: boolean
}

withDefaults(defineProps<IProps>(), {
  badge: true,
  icon: false
})

</script>