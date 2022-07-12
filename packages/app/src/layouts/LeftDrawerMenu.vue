<template lang="pug">
mixin menu-item
  q-item.kt-menu-element.q-pl-xl.items-center(:class='{"kt-active-menu":isCurrentRoute(currentRoute.path, route.path)}')
    router-link(:to='route.path') #[q-icon(:name='route.meta.icon')] {{ route.meta.title }}
    q-badge(v-if='route.meta.count && route.meta.count > 0').kt-badge(align='top'
            color='red'
            rounded
            transparent) {{ route.meta.count }}

q-list
  template(v-for='roleDef in getUserRoles')
    q-item-label
      .row.q-pl-lg.q-pt-lg.text-h6.kt-menu-header
        //- .col-2: q-icon(:name='roleDef.icon')
        .col {{ roleDef.label }}
    .column.q-pl-lg.kt-group-header(v-if='roleDef.role == "app_user"') заявки
      template(v-for='route in getAppRoleRoutes(roleDef.role, true)')
        +menu-item
    template(v-for='route in getAppRoleRoutes(roleDef.role, false)')
      +menu-item

</template>

<style scoped lang="sass">
.kt-badge
  position: relative
  top: -10px
.kt-active-menu
  background-color: darken($kedo-background-light-gray, 10%)
  border-radius: 1.5em
  transition: background-color 2s

.kt-menu-header
  color: $kedo-text-main-color
  font-weight: bolder
  text-transform: uppercase
  font-size: 0.9rem

.kt-group-header
  text-transform: uppercase
.kt-menu-element
  position: relative
  text-transform: none

.kt-menu-element a
  color: lighten($kedo-text-main-color, 20%)
  text-decoration: none
  position: relative

.kt-menu-element a:before
  content: '\203A'
  font-weight: bold
  font-size: 20px
  line-height: 1rem
  position: relative
  opacity: 0
  left: -2em
  transition: left .15s, opacity .15s
.kt-menu-element a:hover:before
  opacity: 1
  left: -.5em


</style>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getRoutes } from '../plugins/PluginManager'
import type { IRouteRecord } from '../plugins/PluginManager';
import type { IUserRole } from '@kedo-team/data-model'
import { computed } from '@vue/reactivity';
import { useUser } from 'src/stores/user'

const allRoutes = ref([])
allRoutes.value = await getRoutes();

function getAppRoleRoutes(role: IUserRole, isRequest: boolean):IRouteRecord[] {
  const filteredRoutes = allRoutes.value.filter(r => r.meta.role == role &&
                                                (!!r.meta.isRequest == isRequest))
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

const user = useUser()
const getUserRoles = computed(()=>{
  switch(user.current.value.role)
  {
    case 'app_admin': return roleDefinitions;
    case 'app_head' : return roleDefinitions.filter(r => r.role !== 'app_admin')
    default: return roleDefinitions.filter(r => r.role === 'app_user')
  }
})

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
}
]

</script>