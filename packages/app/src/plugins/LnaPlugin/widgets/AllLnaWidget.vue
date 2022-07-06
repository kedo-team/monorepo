<template lang="pug">
q-card
  //- HEADER
  q-card-section
    .row
      .col.text-h6 {{ shortName }}
      q-icon.no-wrap.col-auto(name="fullscreen")
    .text-subtitle2 {{ description }}

  //- CONTENT
  q-card-section
    h1(v-if="loading") loading...
    h1(v-else-if="error") {{ error }}
    KT-SmartTable(v-if='result'
            :columns='tblColumns'
            :result='result'
            :loading='loading'
            :error='error'
            )
</template>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>

<script setup lang="ts">
import cfg from 'src/config';

let shortName = "Актуальные ЛНА";
let description = "Все актуальные ЛНА в моей организации";

const {result, loading, error} = cfg.providers.payslip.getPayslips()
const tblColumns = ['createdAt', 'isViewed', 'download']

</script>