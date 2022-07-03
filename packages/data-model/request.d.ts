export interface IRequest {
    id: string;
    requestTypeName: string;
    status: string;
    ownerUserId: string;
    createdAt: string;
    payload: any;
    comment: string;
}
