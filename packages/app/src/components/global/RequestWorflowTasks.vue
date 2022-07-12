<template lang='pug'>
.row
  .col-auto(v-for='(task, index) in data')
    .row.flex-center
      .col-auto: KT-IssueStatus(:data='task.status' icon :badge='false')
      .col-auto
        KT-UserAvatar(:data='getUserInfo(task.assignedToUserId)')
      .col-auto(v-if='index + 1 < data.length')
        q-icon(name='arrow_right_alt')

</template>
<script setup lang='ts'>
import type { ITask } from '@kedo-team/data-model'
import cfg from 'src/config'
import { unref } from 'vue';

defineProps<{
  data: ITask[]
}>()

const userProvider = cfg.providers.user
function getUserInfo(id: string) {
  const { result } = userProvider.getUserInfo(id)
  return unref(result)
}

</script>