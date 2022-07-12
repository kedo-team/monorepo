import type { ComputedRef, Ref } from 'vue'
import { IStatusViewModel, ITaskViewModel } from 'src/view-model'
import { IDataProviderResult } from './common'

export interface IUserTaskDataProvider {
  getUserCurrentTasks(): IDataProviderResult<ITaskViewModel[]>
  getUserCompletedTasks(): IDataProviderResult<ITaskViewModel[]>
  approveTask(id: string): Promise<boolean>
  rejectTask(id: string):  Promise<boolean>
  getCount: Ref<number> | ComputedRef<number>
}
