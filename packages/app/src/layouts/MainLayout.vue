<template lang="pug">
q-layout(view='hhh Lpr lFf')
  q-header(elevated reveal)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      .spacer
      q-avatar
        q-img(src="/logo-title.png")
      q-toolbar-title {{ app_title }}
      q-space
      .row#kt-change-user
        KT-UserAvatar(:data='user.current.value')
        q-btn(flat round dense)
          q-icon(name="more_vert")
          UserMenu(@global-action="onGlobalAction")
  q-drawer.kt-drawer(v-model='leftDrawerOpen' show-if-above)
    Suspense(timeout="0")
      LeftDrawerMenu
  q-page-container
    router-view

</template>
<style lang='sass'>
.kt-drawer
  background-color: $kedo-light-gray
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserMenu from './UserMenu.vue';
import { useUser } from 'src/stores/user';
import LeftDrawerMenu from './LeftDrawerMenu.vue';
// import { appName } from '@kedo-team/config'
//import config from '../../config.yml'

const app_title = 'kedo-team.ru'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
}

const user = useUser()
function onGlobalAction() {
  user.isLayoutInEditMode = true;
}

onMounted(()=>{
  const script = document.createElement('script')
  script.type = 'application/javascript'
  script.innerText = `
        (function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://cdn-ru.bitrix24.ru/b22089788/crm/site_button/loader_2_7m175f.js');`
  document.body.appendChild(script)
})

</script>
