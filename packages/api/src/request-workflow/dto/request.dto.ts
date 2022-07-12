import type { IVacationRequest, Status } from '@kedo-team/data-model'


export class RequestDTO implements IVacationRequest {
    id: string;
    status: Status;
    createdAt: string;
    comment: string;
    ownerUserId: string
    requestTypeName: 'VACATION'
    payload: { dateFrom: string; dateTo: string; isPayed: boolean }

}
