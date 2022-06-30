<template lang="pug">
.column
  ToggleFilter(:options='filterOptions')
  KT-SmartTable(v-if='result'
              :columns='tblColumns'
              :result='result'
              :loading='loading'
              :error='error'
              )

</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToggleFilter from 'src/components/global/ToggleFilter.vue'
import { useUser } from 'stores/user'

import cfg from 'src/config'

const { result, loading, error } = cfg.providers.userTask.getUserTasks()


// const splitter = ref(50)
// const toggleFilter = ref("all")
const filterOptions = [
          {label: 'Все задачи', value: 'all'},
          {label: 'Назначенные мне', value: 'toMe'},
          {label: 'Назначенные мной', value: 'fromMe'}
          ]


const tblColumns = ['createdAt', 'authorUser', 'status', 'assignedToUser', 'requestTitle', 'approveReject']

</script>