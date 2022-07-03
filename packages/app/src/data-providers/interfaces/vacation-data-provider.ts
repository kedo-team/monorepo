import type { IDataProviderResult } from './common'
import type { IUserVacationViewModel } from 'src/view-model'
import type { Ref } from 'vue'
import { IVacationRequest } from '@kedo-team/data-model'
/**
 * Returns all the vacations and buisiness trip for business unit
 * that user belongs to
 */
 export interface IUserVacationDataProvider {
  getUnitsVacation(): IDataProviderResult<IUserVacationViewModel[]>
  getVacationBalance(): IDataProviderResult<number>
  getVacationBalanceOnDate(date: Ref<string> | string): IDataProviderResult<number>
  sendVacationRequest(reqeust: IVacationRequest)
}
