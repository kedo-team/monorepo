import type { Status, IRequestType } from './'

export interface IRequest {
  id: string
  requestTypeName: IRequestType
  status: Status
  ownerUserId: string
  createdAt: string
  payload: any
  comment: string
}
