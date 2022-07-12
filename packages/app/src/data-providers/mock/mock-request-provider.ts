import { IRequestDataProvider } from 'src/data-providers/interfaces'
import data from './data/request-list-data'
import { reactive, unref } from 'vue'
import type { IApprovementRoute, IRequest, IRequestType } from '@kedo-team/data-model';
import { reactiveFuncWrapper } from './reactive-func-wrapper';
import { IRequestViewModel, IStatusViewModel, ITaskViewModel } from 'src/view-model';
import { useUser } from 'src/stores/user';
import { user2, user1 } from './data/users'

import cfg from 'src/config';

export class MockRequestDataProvider implements IRequestDataProvider {
  private userRequests = reactive(data)

  getUserRequests = reactiveFuncWrapper(
    (status: IStatusViewModel) => {
      const currentUserId = unref(useUser().current).id
      const filter = (req: IRequestViewModel) => status == 'COMPLETED' ?
                            (req.status == 'APPROVED' || req.status == 'REJECTED') && (req.ownerUserId == currentUserId) :
                            req.status == 'IN_PROGRESS' && (req.ownerUserId == currentUserId)

      return this.userRequests.filter(filter)
    }
  )

  getApprovementRoute(reqType: IRequestType): IApprovementRoute {
    if (reqType == "CERTIFICATE") {
      return null
    }

    const currentEmail = unref(useUser().current).email
    switch(currentEmail) {
      case user2.email: return [user1]
      case user1.email: return []
      default: return [user2, user1]
    }
  }

  async registerRequest(request: IRequest): Promise<IRequest> {
    const user = useUser()
    return new Promise((res, rej) => {
      const reqVM: IRequestViewModel = {
        ...request,
        id: this.generateUUID(),
        ownerUserId: user.current.value.id,
        ownerUser: user.current.value,
        status: 'IN_PROGRESS',
        createdAt: (new Date()).toISOString(),
        tasksList: []
      }
      const route = this.getApprovementRoute(request.requestTypeName)
      const tasks = this.generateTasks(route, reqVM)
      reqVM.tasksList = tasks
      this.userRequests.push(reqVM)
      res(request)
    })
  }

  private generateTasks(route: IApprovementRoute, request: IRequest): ITaskViewModel[] {
    const user = useUser()
    const tasks = route.map<ITaskViewModel>( (entity, index) => {
      if (Array.isArray(entity)) {
        throw new Error('Array in approvement route not implemented yet')
      }
      const task: ITaskViewModel = {
        id: this.generateUUID(),
        authorUser: user.current.value,
        authorUserId: user.current.value.id,
        assignedToUserId: entity.id,
        assignedToUser: entity,
        createdAt: (new Date()).toISOString(),
        status: index === 0? 'IN_PROGRESS' : 'PENDING',
        order: index,
        request,
        requestId: request.id
      }
      return task
    })
    cfg.providers.userTask.tasks.push(...tasks)
    return tasks
  }

  private generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
}

