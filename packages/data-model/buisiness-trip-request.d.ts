import { IRequest } from './request';
export interface IBuisinessTripRequest extends IRequest {
    payload: IBuisinessTripPayload;
}
interface IBuisinessTripPayload {
    dateFrom: string;
    dateTo: string;
    target: string;
    reason: string;
    goal: string;
}
export {};
