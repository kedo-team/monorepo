<template lang="pug">
.column.items-center
  .col.q-pb-md:  KT-ButtonToggle(v-model='filterModel'
                :options='filterOptions')
  .col: KT-SmartTable(v-if='result'
                :columns='tblColumns'
                :result='result'
                :loading='loading'
                :error='error'
                :itemClick='handle')

</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { IFilterOption } from 'src/view-model'
import cfg from 'src/config'

function handle(id: string) {
  alert(`catch it ${id}`)
}

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