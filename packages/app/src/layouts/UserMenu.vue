<template lang="pug">
q-menu
  q-list(style="max-width: 350px")
    q-item(v-for='item in users'
          clickable v-close-popup
          @click.stop.prevent='setUser(item.id)')
      q-item-section(top avatar)
        q-img(:src='item.avatarUrl')
      q-item-section
        q-item-label {{ item.title }}
        q-item-label(caption) {{ item.description }}

</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import cfg from 'src/config'
async function setUser(id: string) {
  if (import.meta.env.PROD) {
    await showProgress()
    .then(() => cfg.providers.auth.id = id)
  } else {
    cfg.providers.auth.id = id
  }
}

const q = useQuasar()
async function showProgress() {
  return new Promise((res, rej)=>{
    const dialog = q.dialog({
        message: 'Переключаю пользователя... 0%',
        progress: true, // we enable default settings
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })

      // we simulate some progress here...
      let percentage = 0
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

        // we update the dialog
        dialog.update({
          message: `Переключаю пользователя... ${percentage}%`
        })

        // if we are done, we're gonna close it
        if (percentage === 100) {
          clearInterval(interval)
          setTimeout(() => {
            dialog.hide()
            res(true)
          }, 350)
        }
      }, 500)
  })
}

const users = [{
  id: '97ee528f-812f-4f2a-a52b-64c278398871',
  avatarUrl: 'https://cdn.quasar.dev/img/avatar6.jpg',
  title: 'Сотрудник',
  description: 'Неруководящий сотрудник, без права согласования заявок'

},
{
  id: 'ce2d1e62-a324-4a8f-bc03-a9ee14f652b3',
  avatarUrl: 'https://cdn.quasar.dev/img/avatar2.jpg',
  title: 'Начальник отдела',
  description: 'Линейный руководитель, согласающий заявки сотрудников в первую очередь'

},
{
  id: 'ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47',
  avatarUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  title: 'Генеральный директор / Администратор',
  description: 'Администратор системы. В текущей демо-версии бизнес-процессы согласования настроены таким образом, что генеральный директор должен финально согласовывать заявки сотрудников'
}
]
</script>