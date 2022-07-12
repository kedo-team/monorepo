<template lang="pug">
q-chip
  q-avatar: img(:src='data.avatarUrl')
  | {{ data.firstName }} {{ data.lastName }}
  q-tooltip(v-if='tooltip')
    .row
      div email:
      div {{ data.email }}
    .row
      div phone:
      div {{ data.phone }}
</template>
<script setup lang="ts">
import type { IUserViewModel } from 'src/view-model'

export interface IProps {
  data: IUserViewModel
  tooltip?: boolean
}

withDefaults(defineProps<IProps>(), {
  tooltip: true
})
</script>