import type { Status } from './status'

export interface ITask {
  id: string
  createdAt: string
  requestId: string
  authorUserId: string
  assignedToUserId: string
  status: Status
  actionAt?: string
  order: number
}