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
      q-item.kt-menu-element.q-pl-xl.items-center(:class='{"kt-active-menu":isCurrentRoute(currentRoute.path, route.path)}')
        router-link(:to='route.path') #[q-icon(:name='route.meta.icon')] {{ route.meta.title }}

</template>

<style scoped lang="sass">
.kt-active-menu
  background-color: darken($kedo-background-light-gray, 10%)
  border-radius: 1.5em
  transition: background-color 2s

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
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getRoutes } from '../plugins/PluginManager'
import type { IRouteRecord } from '../plugins/PluginManager';
import type { IUserRole } from '@kedo-team/data-model'

const allRoutes = ref([])
allRoutes.value = await getRoutes();

function getAppRoleRoutes(role: IUserRole):IRouteRecord[] {
  const filteredRoutes = allRoutes.value.filter(r => r.meta.role == role)
  return filteredRoutes
}

const currentRoute = useRoute()
function isCurrentRoute(routerPath: string, menuPath: string): boolean {
  return routerPath.includes(menuPath)
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

</script>