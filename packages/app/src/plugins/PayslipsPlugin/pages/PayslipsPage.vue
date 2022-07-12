<template lang="pug">
KT-SmartTable(:result = 'result',
              :columns = 'tblColumns'
              :loading='loading'
              :error='error'
              isRowClickable
              @item-click='showPayslip'
              )

q-dialog(v-model='showPreview',
        full-width)
  q-card
    q-card-section
      .row.container.q-pa-lg.flex-center
        .col: q-pdfviewer(v-model='pdfVisible'
          :src='pdfUrl'
          type='html5'
          content-class='fit container'
          inner-content-class='fit container')

    q-card-actions(align='right')
      q-btn(flat label='OK' v-close-popup)
</template>

<style lang="sass">
.container
  min-height: 500px

</style>

<script setup lang="ts">
import { ref } from 'vue'
import cfg from 'src/config'
import type { IPayslipViewModel } from 'src/view-model'

const tblColumns = ['createdAt', 'isViewed', 'download']
const provider = cfg.providers.payslip

const showPreview = ref(false)
const pdfVisible = ref(true)
const pdfUrl = ref('')


async function showPayslip(item: IPayslipViewModel) {
  pdfUrl.value = item.fileId
  showPreview.value = true
  await provider.setViewed(item.id)
}

const {result, loading, error } = provider.getPayslips()
console.log(result)

</script>