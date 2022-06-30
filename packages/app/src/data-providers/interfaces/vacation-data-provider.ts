import type { IDataProviderResult } from './common'
import type { IUserVacationViewModel } from 'src/view-model'
/**
 * Returns all the vacations and buisiness trip for business unit
 * that user belongs to
 */
 export interface IUserVacationDataProvider {
  getUnitsVacation(): IDataProviderResult<IUserVacationViewModel[]>
}
