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
                      class='cursor-pointer'
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
        :nodes='result.companyUnitsList'
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
    .column.q-pa-md.q-gutter-y-md(v-if='resultUnitInfo')
      .text-h4 {{ resultUnitInfo.companyUnit.title }}
      div.row.text-subtitle2.q-px-lg(v-if='resultUnitInfo.companyUnit.description') 
        .col-2: q-icon(name='info', color='blue')
        .col-10 {{ resultUnitInfo.companyUnit.description }}
      .row(v-if='headUser')
        .text-h6.q-py-md Руководитель:
        q-card(flat bordered)
          q-item
            q-item-section(avatar)
              q-avatar: q-img(:src='resultUnitInfo.companyUnit.headUser.avatarUrl')
            q-item-section 
              q-item-label {{ headUser.firstName }} {{ headUser.lastName }}
              q-item-label(caption v-if='headUser.jobTitle') {{ headUser.jobTitle }}
          q-separator
          q-item
            q-item-section  телефон:
            q-item-section  {{ headUser.phone }}
          q-item
            q-item-section  email:
            q-item-section 
              a(:href='`mailto:${ headUser.email }`') {{ headUser.email }}

      div(v-else) 😢 Информации о руководителе нет

</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable'
import { ref, watch, computed } from 'vue'

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

const queryCompanyUnits = gql`
query AllCompanyUnitsFromTop {
  companyUnitsList(condition: {parentId: null}) {
    id
    title
    childCompanyUnitsList {
      id
      title
    }
  }
}
`
const queryUnitInfo = gql`
query SingleUnitInfo($id: UUID!) {
  companyUnit(id: $id) {
    id
    title
    description
    headUser {
      avatarUrl
      email
      firstName
      lastName
      id
      phone
    }
  }
}
`

const optionsUnitInfo = ref({
  enabled: false
})

const { result, loading, error } = useQuery(queryCompanyUnits);
const { result:    resultUnitInfo,
        loading:   loadingUnitInfo, 
        error:     errorUnitInfo, 
        variables: variablesUnitInfo } = useQuery(queryUnitInfo, {id: selectedUnitId}, optionsUnitInfo)


watch(selectedUnitId, value => {
  
  if (value) {
    variablesUnitInfo.value = {id: selectedUnitId}
    // const id = ~~value
    // variablesUnitInfo.value = {id: value}
    if (!optionsUnitInfo.value.enabled) {
       optionsUnitInfo.value = { enabled: true }
    }
  }
})



</script>
