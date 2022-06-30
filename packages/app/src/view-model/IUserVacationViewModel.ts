import { IUser, IVacation } from "@kedo-team/data-model";

export interface IUserVacationViewModel extends IUser {
  vacationsList: IVacation[]
}