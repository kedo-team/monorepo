<template lang="pug">
q-input(v-if='result'
        ref='filterRef'
        filled bottom-slots clearable
        v-model='filter'
        label='Фильтр')
  template(#hint) начните вводить любой текст в поле фильтра
  template(#append)
    q-icon.cursor-pointer(v-if="filter !== ''"
                      name='clear'
                      @click='resetFilter')


q-splitter(v-model='splitterModel')
  template(#before)
    .q-pa-md.q-gutter-sm

    div(v-if="loading") loading
    q-item(v-if="error")
      q-item-section: q-icon(name='error')
      q-item-section
        pre {{ error }}
    q-tree(v-if='result'
        :nodes='result'
        :filter='filter'
        v-model:selected='selectedUnitId'
        node-key='id'
        label-key='title'
        children-key="childCompanyUnitsList"
        default-expand-all
        accordition)
    //- RIGT PART OF SPLITTER
    //----------------------------------
  template(#after)
    .row.flex-center.justify-center(v-if='loadingUnitInfo')
      .col.text-center
        q-spinner

    .column.q-pa-md.q-gutter-y-md(v-if='resultUnitInfo')
      .text-h4 {{ resultUnitInfo.title }}
      div.row.text-subtitle2.q-px-lg(v-if='resultUnitInfo.description')
        .col-2: q-icon(name='info', color='blue')
        .col-10 {{ resultUnitInfo.description }}
      .column(v-if='resultUnitInfo.headUser')
        .text-h6.q-py-md Руководитель:
        q-card(flat bordered)
          q-item
            q-item-section(avatar)
              q-avatar: q-img(:src='resultUnitInfo.headUser.avatarUrl')
            q-item-section
              q-item-label {{ resultUnitInfo.headUser.firstName }} {{ resultUnitInfo.headUser.lastName }}
              q-item-label(caption v-if='resultUnitInfo.headUser.jobTitle') {{ resultUnitInfo.headUser.jobTitle }}
          q-separator
          q-item
            q-item-section  телефон:
            q-item-section  {{ resultUnitInfo.headUser.phone }}
          q-item
            q-item-section  email:
            q-item-section
              a(:href='`mailto:${ resultUnitInfo.headUser.email }`') {{ resultUnitInfo.headUser.email }}

      div(v-else) 😢 Информации о руководителе нет

</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import gql from 'graphql-tag';
import { ref, computed } from 'vue'
import cfg from 'src/config';

const splitterModel = ref(50);
const filter = ref('')
const filterRef = ref(null)
const selectedUnitId = ref<string | null>(null)

const headUser = computed(()=>{
  return resultUnitInfo.value.companyUnit.headUser
})

function resetFilter () {
        filter.value = ''
        filterRef.value?.focus()
}

// const queryCompanyUnits = gql`
// query AllCompanyUnitsFromTop {
//   companyUnitsList(condition: {parentId: null}) {
//     id
//     title
//     childCompanyUnitsList {
//       id
//       title
//     }
//   }
// }
// `
// const queryUnitInfo = gql`
// query SingleUnitInfo($id: UUID!) {
//   companyUnit(id: $id) {
//     id
//     title
//     description
//     headUser {
//       avatarUrl
//       email
//       firstName
//       lastName
//       id
//       phone
//     }
//   }
// }
// `

const optionsUnitInfo = ref({
  enabled: false
})

const { result, loading, error } = cfg.providers.companyUnit.getUnits()
const { result:    resultUnitInfo,
        loading:   loadingUnitInfo,
        error:     errorUnitInfo } = cfg.providers.companyUnit.getUnitInfo(selectedUnitId)

</script>
