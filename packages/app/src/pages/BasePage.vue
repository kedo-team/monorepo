<template lang="pug">
q-page.main-page-content
    .row.q-pa-md(v-if="route.meta.title")
      q-breadcrumbs.breadcrumbs
        q-breadcrumbs-el.home(label="Домой"
                        to="/"
                        icon="home"
                        color="primary")
        q-breadcrumbs-el(:label='route.meta?.title'
                         :icon='route.meta.icon')
    .column.q-pa-lg(v-if="route.meta.title")
      .text-h2.q-pb-lg {{ route.meta.title }}
      .text-h6(v-if="route.meta.description") {{ route.meta.description }}
    .page-content.q-pa-lg
      RouterView(v-slot='{ Component, route }')
        //- Transition(name='fade'
        //-            mode="out-in"): 
        KeepAlive: Suspense
          template(#default)
            component(:is='Component',
                      :key='route.path')
          template(#fallback) Loading....
        
          

</template>

<style scoped lang="scss">
.main-page-content {
  background-color: $kedo-light-gray;
}
.page-content {
  background-color: white;
  height: 100%;
}
.breadcrumbs {
  color: $kedo-dark-background-text;
  .home {
    color: $kedo-dark-background;
  }
}
</style>

<script setup lang="ts">

import { useRoute } from 'vue-router'
const route = useRoute()

// this is need to calm down linter. It worried because route.meta.title has unknown type.
const routeTitle: string = route.meta?.title as string ?? ''

</script>