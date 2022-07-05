import type { ICompanyUnit, ICompanyUnitInfo } from '@kedo-team/data-model';
import type { ICompanyUnitDataProvider, IDataProviderResult } from '../interfaces'
import {units, unitInfo} from './data/company-units'
import { ref, Ref, isRef, watch, unref } from 'vue'

export class MockCompanyUnitProvider implements ICompanyUnitDataProvider {
  getUnits(): IDataProviderResult<ICompanyUnit[]> {
    return {
      result: ref(units),
      loading: ref(false),
      error: ref(null)
    }
  }

  getUnitInfo(unitId: Ref<string> | string): IDataProviderResult<ICompanyUnitInfo> {
    const result = ref(null),
          loading = ref(false),
          error = ref(null)

    async function update(val) {
      // reseting state
      result.value = null
      loading.value = true
      error.value = null

      // fetching (computing) value
      setTimeout(() => {
        // setting state
        result.value = unitInfo[val]
        loading.value = false
      }, 1000)
    }

    if (isRef(unitId)) {
      watch(unitId, (newVal) => {
        update(newVal)
      })

    }
     else {
      update(unitId)
    }

    return {
      result,
      loading,
      error
    }
  }
}
