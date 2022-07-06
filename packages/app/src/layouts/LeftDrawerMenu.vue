<template lang="pug">
q-list
  template(v-for='roleDef in roleDefinitions')
    q-item-label
      .row.q-pa-lg.text-h6.kt-menu-header
        //- .col-2: q-icon(:name='roleDef.icon')
        .col {{ roleDef.label }}

        .kedo-expansion(v-for='roleDef in roleDefinitions'
                                      v-bind='roleDef'
                                      default-opened
                                      header-class="kedo-menu-expansion-header")
    template(v-for='route in getAppRoleRoutes(roleDef.role)')
      q-item.kt-menu-element.q-pl-xl
        router-link(:to='route.path') #[q-icon(:name='route.meta.icon')] {{ route.meta.title }}

        //- q-btn.navigator-links(:label='route.meta.title'
        //-                       :to='route.path'
        //-                       :icon='route.meta.icon'
        //-                       no-caps
        //-                       flat
        //-                       padding="xs")
        //- div.nav-link-container(v-for='route in getAppRoleRoutes(roleDef.role)')
        //-     q-btn.navigator-links(:label='route.meta.title'
        //-                           :to='route.path'
        //-                           :icon='route.meta.icon'
        //-                             flat
        //-                             padding="xs")

</template>

<style scoped lang="sass">
.kt-menu-header
  color: $kedo-text-main-color
  text-transform: uppercase
  font-size: 0.9rem


.kt-menu-element
  position: relative

.kt-menu-element a
  color: lighten($kedo-text-main-color, 20%)
  text-decoration: none

.kt-menu-element a:before
  content: '\203A'
  font-weight: bold
  font-size: 20px
  line-height: 1rem
  position: absolute
  opacity: 0
  left: 0
  transition: left .15s, opacity .15s
.kt-menu-element a:hover:before
  opacity: 1
  left: 1.25em


</style>

<script setup lang="ts">
import { getRoutes } from '../plugins/PluginManager'
import type { IRouteRecord } from '../plugins/PluginManager';
import type { IUserRole } from '@kedo-team/data-model'

const allRoutes = await getRoutes();

function getAppRoleRoutes(role: IUserRole):IRouteRecord[] {
  const filteredRoutes = allRoutes.filter(r => r.meta.role == role)
  return filteredRoutes
}

interface IRoleDefinition {
  role: IUserRole
  label: string
  icon: string
}
const roleDefinitions: IRoleDefinition[] = [{
  role: 'app_user',
  label: 'Я как сотрудник',
  icon: 'perm_identity'
},
{
  role: 'app_head',
  label: 'Я как руководитель',
  icon: 'supervisor_account'
},
{
  role: 'app_admin',
  label: 'Я как администратор',
  icon: 'manage_accounts'
}]

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