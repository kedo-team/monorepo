import { data } from './data/vacation-data'
import { date as qDate } from 'quasar'
import { IUserVacationDataProvider, IDataProviderResult } from 'src/data-providers/interfaces'
import { IUserVacationViewModel } from 'src/view-model'
import { isRef, ref, Ref, ComputedRef, unref, watchEffect } from 'vue'



export class MockVacationDataProvider implements IUserVacationDataProvider {
  getUnitsVacation(): IDataProviderResult<IUserVacationViewModel[]> {
    return {
      result: ref(data),
      loading: ref(false),
      error: ref(null)
    }
  }

  private _vacationBalanceResult
  getVacationBalance(): IDataProviderResult<number> {
    if (!this._vacationBalanceResult)
    this._vacationBalanceResult = {
      result:  ref(14),
      loading: ref(false),
      error:   ref(null)
    }
    return this._vacationBalanceResult
  }

  getVacationBalanceOnDate(date: Ref<string> | string): IDataProviderResult<number> {
    const result  = ref<number>(null),
          loading = ref<boolean>(false),
          error   = ref<string>(null)
    
          
    async function update(currentBalance: number) {
      // reseting state
      result.value = null
      loading.value = true
      error.value = null

      // fetching (computing) value
      const dateDiff = qDate.getDateDiff(unref(date), Date.now(),'days')
      setTimeout(() => {
        // setting state
        result.value = currentBalance + Math.round(dateDiff * (28/365))
        loading.value = false
      }, 1000)

      
    }


    if (isRef(date)) {
      watchEffect(()=>{
        const currentBalance = this.getVacationBalance().result.value
        update(currentBalance)
      })
    }
     else {
      const currentBalance = this.getVacationBalance().result.value
      update(currentBalance)
    }
    
    return {
      result,
      loading,
      error
    };
  }
}
