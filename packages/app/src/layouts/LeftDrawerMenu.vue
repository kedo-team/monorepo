<template lang="pug">
q-list
    //- q-item-label(header)
    //- | kedo навигатор
    q-expansion-item.kedo-expansion(label="Я как сотрудник" 
                    icon="perm_identity" 
                    default-opened 
                    header-class="kedo-menu-expansion-header")
      div.nav-link-container(v-for='route in routes')
        q-btn.navigator-links(:label='route.meta.title' 
                              :to='route.path'
                              :icon='route.meta.icon'
                               flat 
                               padding="xs")
    q-expansion-item(label="Я как руководитель" 
                    icon="supervisor_account" 
                    default-opened
                    header-class="kedo-menu-expansion-header")
      div.nav-link-container(v-for='link in linksList')
        q-btn(:label='link.title' v-bind='link', flat padding="xs")
    q-expansion-item(label="Я как администратор"
                    icon="manage_accounts" 
                    default-opened
                    header-class="kedo-menu-expansion-header")
      div.nav-link-container(v-for='link in linksList')
        q-btn(:label='link.title' v-bind='link', flat padding="xs")
</template>

<style scoped lang="scss">
.spacer {
  width: 12px
}
.nav-link-container {
  margin-left: 24px;
  color: $kedo-dark-background-text;
}
</style>


<script setup lang="ts">
import { getRoutes } from '../plugins/PluginManager'

const routes = getRoutes();

const linksList = [
  {
    title: 'Заявление на отпуск',
    caption: 'quasar.dev',
    icon: 'self_improvement',
    link: '/request-for-vacation'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];
</script>