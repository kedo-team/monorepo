<template lang="pug">
.column.items-center
  .col.q-pb-md:  KT-ButtonToggle(v-model='filterModel'
                :options='filterOptions')
  .col: KT-SmartTable(
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

import type { IFilterOption, ITaskViewModel, IStatusViewModel } from 'src/view-model'
import cfg from 'src/config'
import { useQuasar } from 'quasar'


const filterModel = ref<IStatusViewModel>('IN_PROGRESS')

const filterOptions: IFilterOption[] = [
  {label: 'В работе', value: 'IN_PROGRESS', default: true},
          {label: 'Закрытые', value: 'COMPLETED'}
          ]

const tblColumns = ['createdAt', 'authorUser', 'status', 'assignedToUser', 'requestTitle', 'approveReject']
const { result, loading, error } = cfg.providers.userTask.getUserCurrentTasks()

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
        .onOk(() => {
          res(true)
          q.notify(`Задача ${action === 'approve' ? "Согласована" : "Отклонена"}`)
        })
        .onCancel(()=> res(false))
  })
}

function requestToHtmlString(task: ITaskViewModel): string {
  return `${task.request.requestTypeName} ${task.authorUser.firstName} ${task.authorUser.lastName} <br>
          Период: ${task.request.payload.dateFrom} - ${task.request.payload.dateTo}<br>
          Тип: ${task.request.payload.isPayable ? 'Опачиваемый' : 'За свой счет'}`
}
</script>