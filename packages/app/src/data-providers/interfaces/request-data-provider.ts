import { IRequestViewModel, IStatusViewModel } from 'src/view-model'
import { IDataProviderResult } from './common'
import type { IApprovementRoute, IRequest, IRequestType } from '@kedo-team/data-model'
import type { Ref } from 'vue'

export interface IRequestDataProvider {
  getUserRequests(status: Ref<IStatusViewModel> | IStatusViewModel): IDataProviderResult<IRequestViewModel[]>
  getApprovementRoute(reqType: IRequestType): IApprovementRoute
  registerRequest(request: IRequestViewModel): Promise<IRequest>
}
