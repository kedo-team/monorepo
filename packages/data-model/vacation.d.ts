import type { ITask } from './task';
import type { IUser } from './user';
import type { Status } from './status';
/**
 * Stores info for REQUEST for vacation
 */
export declare type IVacationRequest = {
    ownerUserId?: string;
    requestTypeName: "VACATION";
    taskList?: ITask[];
    payload: IVacationPayload;
};
declare type IVacationPayload = {
    dateFrom: string;
    dateTo: string;
    isPayed?: boolean;
};
/**
 * Stores info of already REQUESTED vacation
 */
export interface IVacationData {
    status: Status;
    payload: IVacationPayload;
}
export interface IUserVacation {
    user: IUser;
    vacations: IVacationData[];
}
export {};
