<template lang="pug">
q-card
  //- HEADER
  q-card-section
    .row
      .col.text-h6 Документы, требующие моего участия
      q-icon.no-wrap.col-auto(name="fullscreen")
    .text-subtitle2 Направленные мне документы, ожидающие моего действия

  //- CONTENT
  q-card-section
    h1(v-if="loading") loading...
    h1(v-else-if="error") {{ error }}
    q-table.sticky-header-table(v-if="result"
                                :rows = "result.documents.nodes", 
                                :columns = "columns",
                                row-key  = "id",
                                :loading="loading"
                                flat, bordered)
      //- LOADING
      template(v-slot="loading")
        q-inner-loading(showing color="primary")
      
      //- NO DATA
      template(v-slot:no-data="{ icon, message }")
        .full-width.row.flex-center.text-accent.q-gutter-sm
          q-icon(size="2em", name="sentiment_ssatisfied")
          span Well this is sad... {{ message }}
      
      //- CELL TEMPLATE - documentTypeId
      template(v-slot:body-cell-documentTypeId="props")
        q-td(:props="props")
            q-badge(color="green") {{ props.value }}
      
      //- CELLTEMPLATE - createdByUser
      template(v-slot:body-cell-createdByUser="props")
        q-td(:props="props")
          q-chip
            q-avatar
              img(:src="props.value.avatarUrl")
            | {{ `${props.value.lastName} ${props.value.firstName}` }}
      

      //- template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="createdAt", :props="props") {{ getLocalDate(props.row.createdAt) }}
          q-td(key="title", :props="props") {{ props.row.title }}
          q-td(key="createdByUser", :props="props") 
            a(href="#")
            |  {{ `${props.row.createdByUser.lastName} ${props.row.createdByUser.firstName}` }}
          q-td(key="documentTypeId", :props="props")
            q-badge(color="green") {{ props.row.documentTypeId }}
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

import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { QTable } from 'quasar';

let shortName = "Документы мне на подпись";
let description = "Большое и длинное описание нового виджета Мои документы";

const columns: any[] = [
  {
    name: 'createdAt',
    required: true,
    label: 'Дата поступления',
    align: 'left',
    field: 'createdAt',
    format: (val: any) => getLocalDate(val),    
    sortable: true
  },
  {
    name: 'documentTypeId',
    label: 'Тип',
    field: 'documentTypeId',
    align: 'left'
  },
  { 
    name: 'title', 
    align: 'left',
    label: 'Заголовок',
    field: 'title',
  },
  {
    name: 'createdByUser',
    label: 'Создан',
    field: 'createdByUser',
    align: 'center'
  },
];

const QueryUserActiveDocuments = gql`
  query QueryUserActiveDocuments {
    documents {
      nodes {
        id
        documentTypeId
        title
        createdAt
        createdByUser {
          id
          firstName
          lastName
          avatarUrl
        }
      }
    }
  }
`;

const { result, loading, error } = useQuery(QueryUserActiveDocuments);
// const rows = result.query.activeDocuments.nodes;

function getLocalDate(val: string): string {
  const date = new Date(val);
  return date.toLocaleDateString("ru-RU");
}
  

</script>