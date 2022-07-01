export interface ITask {
    id: string;
    createdAt: string;
    requestId: string;
    authorUserId: string;
    assignedToUserId: string;
    status: string;
    order: number;
}
