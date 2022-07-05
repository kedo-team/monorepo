import { IRequestViewModel } from 'src/view-model'
import { IDataProviderResult } from './common'
import type { IApprovementRoute, IRequestType } from '@kedo-team/data-model'

export interface IRequestDataProvider {
  getUserRequests(): IDataProviderResult<IRequestViewModel[]>
  getApprovementRoute(reqType: IRequestType): IApprovementRoute
}
