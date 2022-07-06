<template lang="pug">
.row.justify-end
  q-btn(flat round dense)
    q-icon(name="more_vert")
    q-menu
      q-list(dense)
        q-item(clickable)
          q-item-section Размер
          q-item-section(side)
            q-icon(name='keyboard_arrow_right')
            //- submenu
          q-menu(anchor='top end')
            q-list
              q-item(v-for='s in Object.keys(sizes)'
                    dense clickable
                    @click='size = sizes[s]')
                q-item-section
                  .row.q-gutter-sm
                    q-icon(v-if='s == size'
                           name='check')
                    div {{ sizes[s] }}
.row.q-gutter-sm.justify-center
  q-btn(v-for='route in routes'
        :label='route.meta.title'
        :icon='route.meta.icon'
        :to='route.path'
        :size='size'
        color='primary')

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRoutes } from 'src/plugins/PluginManager'

const routes = ref([])
routes.value = await getRoutes()
console.log(routes)
const size = ref('sm')
const sizes: {[key: string]: string} = {
  'xs': 'xs',
  's':  'sm',
  'm':  'md',
  'l':  'lg',
  'xl': 'xl'
}


</script>
