import type { Ref } from 'vue'
import { ITaskViewModel } from 'src/view-model'
import { IDataProviderResult } from './common'

export interface IUserTaskDataProvider {
  getUserTasks(): IDataProviderResult<ITaskViewModel[]>
  approveTask(id: string): Promise<boolean>
  rejectTask(id: string):  Promise<boolean>
  getCount(): Ref<number>
}
