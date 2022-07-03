import { IRequest } from './request';
export interface IVacation {
    id: string;
    createdAt: string;
    status: string;
    ownerUserId: string;
    requestId: string;
    payload: IVacationPayload;
}
/**
 * Stores info for REQUEST for vacation
 */
export interface IVacationRequest extends IRequest {
    payload: IVacationPayload;
}
declare type IVacationPayload = {
    dateFrom: string;
    dateTo: string;
    isPayed: boolean;
};
export {};
