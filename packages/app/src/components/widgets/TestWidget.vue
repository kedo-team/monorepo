<template lang="pug">
q-card(style="background-color: antiquewhite;")
  //- HEADER
  q-card-section
    .row
      .col.text-h6 Тестовый плагин
      q-icon.no-wrap.col-auto(name="fullscreen")

  //- CONTENT
  //- q-card-section
  //-   pre(v-if="result") {{ result }}
  //-   pre(v-if="error") {{ error }}

</template>

<script setup lang="ts">
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';



// const setDescrpition = inject(IK_SetWidgetDescription);
// if (setDescrpition) {
//   console.log('try inject');
//   setDescrpition("Изнутри пишу тебе", "Не буду долго себя описывать");
// }

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

let { result, loading, error } = useQuery(QueryUserActiveDocuments);

</script>
