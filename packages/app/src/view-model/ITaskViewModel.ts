import { IRequest, ITask, IUser } from "@kedo-team/data-model"

export interface ITaskViewModel extends ITask {
  authorUser: IUser
  assignedToUser: IUser
  request: IRequest
}