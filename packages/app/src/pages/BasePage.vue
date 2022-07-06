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


  //- .page-content.q-pa-lg
  .row.flex-center
    .page-container
      #paper1.paper
      #paper2.paper
      .paper3.paper
        .column.q-pa-xl.flex-center(v-if="route.meta.title")
          .text-h2.q-pb-lg.kt-page-header {{ route.meta.title }}
            q-badge.kt-badge(align="top") i
              q-tooltip.text-h6.kt-header-tooltip.shadow-4(v-if="route.meta.description" max-width="30rem")
                | {{ route.meta.description }}
        .q-px-xl.q-pb-xl
          RouterView(v-slot='{ Component, route }')
            //- Transition(name='fade'
            //-            mode="out-in"):
            KeepAlive: Suspense
              template(#default)
                component(:is='Component',
                          :key='route.path')
              template(#fallback) Loading....



</template>

<style scoped lang="sass">
.kt-page-header
  text-transform: uppercase
  letter-spacing: 2px
  color: $kedo-text-main-color
  .kt-badge
    letter-spacing: 0
.main-page-content
  background-color: $kedo-light-gray

.page-container
  display: flex
  align-content: flex-start
  flex-grow: 1
  min-width: 0
  margin: 20px
  margin-bottom: 0
  width: 100%
  max-width: 1100px

.paper
  width: 100%
  background: white
  border-radius: 4px
  box-shadow: 1px 2px 4px 1px rgb(0 0 0 / 15%)

#paper1, #paper2
  background: #f8fafb
  max-height: 1500px

#paper1
  margin-top: -20px
  margin-left: 20px
  transform: rotate(3deg)
  z-index: 0

#paper2
  margin-top: 30px
  margin-left: calc(-100% - 20px)
  transform: rotate(-5deg)
  z-index: 0
.paper3
  margin-top: 20px
  margin-left: -100%
  z-index: 1

.breadcrumbs
  color: $kedo-dark-background-text
  .home
    color: $kedo-dark-background

</style>

<script setup lang="ts">

import { useRoute } from 'vue-router'
const route = useRoute()

// this is need to calm down linter. It worried because route.meta.title has unknown type.
const routeTitle: string = route.meta?.title as string ?? ''

</script>