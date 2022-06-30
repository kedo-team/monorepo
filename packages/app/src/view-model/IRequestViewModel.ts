import { IRequest, ITask, IUser } from "@kedo-team/data-model";

export interface IRequestViewModel extends IRequest {
  ownerUser: IUser
  tasksList: ITask[]
}