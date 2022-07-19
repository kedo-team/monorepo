<template lang='pug'>
q-layout(view='hHh Lpr lFf')
  q-header(elevated).header
    q-toolbar.glossy
      q-btn.lt-md(flat
            dense
            round
            icon='menu'
            aria-label='Menu'
            @click='toggleLeftDrawer'
            )

      q-toolbar-title
        a(href='/').text-white
          q-img.logo(src='/logo.png'
                  alt='Логотип компании'
                  fit='fill')
          | kedo-team
      q-space
      q-tabs.gt-sm
        q-route-tab(v-for='link in linksList'
                    :icon='link.icon'
                    :to='link.link'
                    ) {{ link.title }}
        q-btn.kt-demo-button(color='red'
                             href='https://demo.kedo-team.ru'
                             target='_blank') ДЕМО

  q-drawer(v-model='leftDrawerOpen'
            bordered)

    q-list
      EssentialLink(
        v-for='link in linksList'
        :key='link.title'
        v-bind='link')

  q-page-container
    router-view

  q-footer
    BlockFooter

</template>
<style lang="sass">
.kt-demo-button
  min-width: 100px
.logo
  max-width:64px
.header
  background-color: rgba($primary, .95)
</style>

<script setup lang='ts'>
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue'
import BlockFooter from './../pages/components/BlockFooter.vue'

const linksList = [
  // {
  //   title: 'для HRD',
  //   icon: 'school',
  //   caption: 'КЭДО директору по персоналу',
  //   link: '/kedo-4-hrd'
  // },
  // {
  //   title: 'для CEO',
  //   icon: 'chat',
  //   caption: 'КЭДО Генеральному директору',
  //   link: '/kedo-4-ceo'
  // },
  // {
  //   title: 'для CTO',
  //   icon: 'code',
  //   caption: 'КЭДО для ИТ-Директора ',
  //   link: '/kedo-4-cto'
  // },
  // {
  //   title: 'Блог',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'О нас / Контакты',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // }
];

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
