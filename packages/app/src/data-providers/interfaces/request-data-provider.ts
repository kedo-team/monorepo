import { IRequestViewModel } from 'src/view-model';
import { IDataProviderResult } from './common';

export interface IRequestDataProvider {
  getUserRequests(): IDataProviderResult<IRequestViewModel[]>
}
