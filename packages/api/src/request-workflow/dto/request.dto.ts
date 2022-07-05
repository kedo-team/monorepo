import { IVacationRequest } from '@kedo-team/data-model'


export class RequestDTO implements IVacationRequest {
    id: string;
    status: string;
    createdAt: string;
    comment: string;
    ownerUserId: string
    requestTypeName: 'VACATION'
    payload: { dateFrom: string; dateTo: string; isPayed: boolean }

}
