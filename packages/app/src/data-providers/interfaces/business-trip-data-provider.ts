import { IBuisinessTripRequest } from '@kedo-team/data-model'
/**
 * Returns all the vacations and buisiness trip for business unit
 * that user belongs to
 */
 export interface IBuisinessTripDataProvider {
  // getUnitsVacation(): IDataProviderResult<IUserVacationViewModel[]>
  // getVacationBalance(): IDataProviderResult<number>
  // getVacationBalanceOnDate(date: Ref<string> | string): IDataProviderResult<number>
  sendRequest(reqeust: IBuisinessTripRequest)
}
