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
import { ref } from 'vue';
import UserMenu from './UserMenu.vue';
import { useUser } from 'src/stores/user';
import LeftDrawerMenu from './LeftDrawerMenu.vue';

const app_title = import.meta.env.VITE_APP_TITLE

const leftDrawerOpen = ref(false)
function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
}

const user = useUser();
function onGlobalAction() {
  user.isLayoutInEditMode = true;
}
</script>
