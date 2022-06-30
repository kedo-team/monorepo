import { ITaskViewModel } from 'src/view-model'
import { IDataProviderResult } from './common'

export interface IUserTaskDataProvider {
  getUserTasks(): IDataProviderResult<ITaskViewModel[]>
}
