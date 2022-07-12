import { IUserRole } from './user-roles'

export interface IUser {
  id: string
  firstName: string
  email: string
  lastName: string
  avatarUrl: string
  phone: string
  role: IUserRole
}