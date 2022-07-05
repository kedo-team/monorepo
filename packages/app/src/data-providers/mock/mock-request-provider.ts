import { IRequestDataProvider } from 'src/data-providers/interfaces'
import { IRequestViewModel } from 'src/view-model';
import { IDataProviderResult } from '../interfaces/common';
import data from './data/request-list-data'
import { ref } from 'vue'
import type { IApprovementRoute, IRequestType } from '@kedo-team/data-model';
import anton from './data/user-anton'
import lera from './data/user-lera'

export class MockRequestDataProvider implements IRequestDataProvider {
  getUserRequests(): IDataProviderResult<IRequestViewModel[]> {
    return {
      result: ref(data),
      loading: ref(false),
      error: ref(null)
    }
  }

  getApprovementRoute(reqType: IRequestType): IApprovementRoute {
    if (reqType == "CERTIFICATE") {
      return null
    }

    return [lera, anton]

  }
}

