import { IVacationRequest } from '@kedo-team/data-model'


export class RequestDTO implements IVacationRequest {
    ownerUserId: string
    requestTypeName: 'VACATION'
    payload: { dateFrom: string; dateTo: string; isPayed: boolean }
   
}
