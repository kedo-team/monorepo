import { ref } from 'vue'
import { ITaskViewModel } from 'src/view-model';
import { IUserTaskDataProvider } from 'src/data-providers/interfaces'
import { IDataProviderResult } from '../interfaces/common';
import data from './data/tasks'
import type { Status } from '@kedo-team/data-model';
export class MockUserTaskDataProvider implements IUserTaskDataProvider {
  private result  = ref(data)
  private loading = ref(false)
  private error   = ref(null)

  getUserTasks(): IDataProviderResult<ITaskViewModel[]> {
    return {
      result: this.result,
      loading: this.loading,
      error: this.error
    }
  }

  async approveTask(id: string): Promise<boolean> {
    return this.doAction(id, 'APPROVED')
  }

  async rejectTask(id: string): Promise<boolean> {
    return this.doAction(id, 'REJECTED')
  }

  async doAction(id: string, actionName: Status): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      const task = this.result.value.find(task => task.id === id)
      if (!task) rej('task not found')
      task.status = actionName
      task.actionAt = Date()
      res(true)
    })
  }
}
