<template lang="pug">
.column
  KT-ButtonToggle(v-model='filterModel'
              :options='filterOptions')

  KT-SmartTable(v-if='result'
              :columns='tblColumns'
              :result='result'
              :loading='loading'
              :error='error'
              )

</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useUser } from 'stores/user'
import type { IFilterOption } from 'src/view-model'

import cfg from 'src/config'

const { result, loading, error } = cfg.providers.userTask.getUserTasks()

const filterModel = ref('')

// const splitter = ref(50)
// const toggleFilter = ref("all")
const filterOptions: IFilterOption[] = [
          {label: 'Все задачи', value: 'all'},
          {label: 'Назначенные мне', value: 'toMe', default: true},
          {label: 'Назначенные мной', value: 'fromMe'}
          ]


const tblColumns = ['createdAt', 'authorUser', 'status', 'assignedToUser', 'requestTitle', 'approveReject']

</script>