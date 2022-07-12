import { data } from './data/vacation-data'
import { notify } from 'src/decorators/notify'
import { date as qDate } from 'quasar'
import { IUserVacationDataProvider, IDataProviderResult } from 'src/data-providers/interfaces'
import { IUserVacationViewModel } from 'src/view-model'
import { isRef, reactive, ref, Ref, unref, watch, computed } from 'vue'
import { IVacationRequest } from '@kedo-team/data-model'
import { reactiveFuncWrapper } from './reactive-func-wrapper'

export class MockVacationDataProvider implements IUserVacationDataProvider {
  private unitVacationData = reactive(data)

  getUnitsVacation = reactiveFuncWrapper(
    ()=>this.unitVacationData
  )

  getVacationBalance = computed(
    ()=>14
  )

  getVacationBalanceOnDate = reactiveFuncWrapper(
    (date: Ref<string> | string)  => {
      const dateDiff = qDate.getDateDiff(unref(date), Date.now(),'days')
      const b = this.getVacationBalance.value + Math.round(dateDiff * (28/365))
      return b
    }
  )

  @notify()
  async sendVacationRequest(request: IVacationRequest) {
    return ;
  }
}

