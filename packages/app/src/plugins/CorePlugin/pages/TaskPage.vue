<template lang="pug">
.column.items-center
  .col.q-pb-md:  KT-ButtonToggle(v-model='filterModel'
                :options='filterOptions')
  .col: KT-SmartTable(v-if='result'
                :columns='tblColumns'
                :result='result'
                :loading='loading'
                :error='error'
                isRowClickable
                @item-approve='taskApprove'
                @item-reject='taskReject')

</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { IFilterOption, IRequestViewModel, ITaskViewModel } from 'src/view-model'
import cfg from 'src/config'
import { useQuasar } from 'quasar'

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

async function taskApprove(task: ITaskViewModel) {
  const res = await confirmOperation('approve', task)
  if (res) {
    cfg.providers.userTask.approveTask(task.id)
  }
}
async function taskReject(task: ITaskViewModel) {
  const res = await confirmOperation('reject', task)
  if (res) {
    cfg.providers.userTask.rejectTask(task.id)
  }
}

const q = useQuasar()
async function confirmOperation(action: 'approve' | 'reject', task: ITaskViewModel): Promise<boolean> {
  return new Promise((res, rej) => {
    q.dialog({
            html: true,
            title: `<b style="text-decoration: underline">${ action === 'approve' ? 'Согласовать' : 'Отклонить'}</b> задачу?`,
            message: requestToHtmlString(task),
            ok: {
                flat: true,
                label: 'Да',
                color: 'positive'
            },
            cancel: {
                flat: true,
                label: 'Нет',
                color: 'negative'
            }
        })
        .onOk(() => res(true))
        .onCancel(()=> res(false))
  })
}

function requestToHtmlString(task: ITaskViewModel): string {
  return `${task.request.requestTypeName} ${task.authorUser.firstName} ${task.authorUser.lastName} <br>
          Период: ${task.request.payload.dateFrom} - ${task.request.payload.dateTo}<br>
          Тип: ${task.request.payload.isPayable ? 'Опачиваемый' : 'За свой счет'}`
}
</script>