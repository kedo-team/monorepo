import type { ITask } from './task'
import type { IUser } from './user'
import type { Status } from './status'
import { IRequestType } from './request-types'

export interface IVacation {
    id: string
    createdAt: string
    status: string
    ownerUserId: string
    requestId: string
    payload: IVacationPayload
}

/**
 * Stores info for REQUEST for vacation
 */
export interface IVacationRequest {
    id: string
    requestTypeName: string
    payload: IVacationPayload,
    status: string,
    createdAt: string,
    ownerUserId: string
}

type IVacationPayload = {
    dateFrom: string
    dateTo:   string
    isPayed:  boolean
}

/**
 * Stores info of already REQUESTED vacation
 */
export interface IVacationData {
    status: Status,
    payload: IVacationPayload
}

export interface IUserVacation {
    user: IUser
    vacations: IVacationData[]
}