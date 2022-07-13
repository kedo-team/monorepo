import { isRef, ref, reactive, unref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { IUserTaskDataProvider } from 'src/data-providers/interfaces'
import data from './data/tasks'
import type { Status } from '@kedo-team/data-model'
import { reactiveFuncWrapper } from './reactive-func-wrapper'
import { useUser } from 'src/stores/user'

export class MockUserTaskDataProvider implements IUserTaskDataProvider {
  public tasks = reactive(data)

  getUserCurrentTasks = reactiveFuncWrapper(()=>{
    const user = useUser()
    return this.tasks.filter(t => t.status == 'IN_PROGRESS' &&
                                  t.assignedToUserId == unref(user.current).id)
  })

  async approveTask(id: string): Promise<boolean> {
    return this.doAction(id, 'APPROVED')
  }

  async rejectTask(id: string): Promise<boolean> {
    return this.doAction(id, 'REJECTED')
  }

  private async doAction(id: string, actionName: Status): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      const task = this.tasks.find(task => task.id === id)
      if (!task) rej('task not found')
      task.status = actionName
      task.actionAt = Date()
      res(true)
    })
  }

    getCount = computed(()=>this.getUserCurrentTasks().result.value.length)

  getUserCompletedTasks = reactiveFuncWrapper(()=>
    this.tasks.filter(t => t.status == 'APPROVED' || t.status == 'REJECTED')
  )
}
