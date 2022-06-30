<template lang="pug">
q-table(v-if="result").sticky-header-table(:rows = "result", 
                            :columns = "columns"
                            :loading="loading"
                            flat, bordered, clickable,
                            rows-per-page-label='Записей на странице'
                            :pagination='{rowsPerPage: 10}'
                            @row-click='showPayslip')
  //- LOADING
  template(#loading)
    q-inner-loading(showing color="primary")
  
  //- NO DATA
  template(v-slot:no-data="{ icon, message }")
    .full-width.row.flex-center.text-accent.q-gutter-sm
      q-icon(size="2em", name="sentiment_satisfied")
      span Well this is sad... {{ message }}
 
  //- CELL TEMPLATE
  template(v-for='template in templates' 
           #[`body-cell-${template.slot}`]='props')
    q-td(:props="props")
      component(:key='template.slot' :is='template.component', :data="props.value")
      

  //- template(v-slot:body-cell-isViewed="props")
  //-   q-td(:props="props")
  //-     q-icon(v-if="props.value" 
  //-            name='check_circle_outline'
  //-            size='sm' color='green')
  //-     q-icon(v-else name='highlight_off'
  //-           size='sm' color='red')
//- q-splitter(v-model="splitter")
//-   template(#before)
//-     pre {{ columns }}
//-   template(#after)
//-     pre {{ templates }}
  

q-dialog(v-model='showPreview',
        full-width)
  q-card 
    q-card-section
      .container.q-pa-lg
        q-pdfviewer(v-model='pdfVisible'
          src='/sample.pdf'
          type='html5'
          content-class="fit container"
          inner-content-class="fit container")
     
    q-card-actions(align='right')
      q-btn(flat label="OK" v-close-popup)
</template>

<style lang="sass">
.container
  
  min-width: 400px
  min-height: 1000px
  width: 100%
  height: 100%

.sticky-header-table
  /* height or max-height is important */
  max-height: 1000px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

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
import { ref, reactive } from 'vue'
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable'
import { getQTableTemplateDefinition,
         getQTableColumnDefinition } from '../../../utils/col-definition-helper'
import cfg from 'src/config';

const splitter = ref(50)
// const { today } = QCalendarScheduler;

const tblColumns = ['createdAt', 'isViewed', 'download']
const templates = getQTableTemplateDefinition(tblColumns)
const columns = getQTableColumnDefinition(tblColumns)

const showPreview = ref(false)
const pdfVisible = ref(true)
const pdfUrl = ref('')

function showPayslip(evt: Event, row: any, index: number) {
  pdfUrl.value = row.fileId;
  showPreview.value = true;
  //console.log(row);
}

const QueryUserActiveDocuments = gql`
  query QueryUserPayslips {
  payslipsList {
    id
    createdAt
    fileId
    period
    isViewed
  }
}
`;
const {result, loading, error } = cfg.providers.payslip.getPayslips()
// const { result, loading, error } = useQuery(QueryUserActiveDocuments);
// const rows = result.query.activeDocuments.nodes;

function getLocalDate(val: string): string {
  const date = new Date(val);
  return date.toLocaleDateString("ru-RU");
}

</script>