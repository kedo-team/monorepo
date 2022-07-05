import { IUser } from '.'

export interface ICompanyUnit {
  id: string
  title: string
  childCompanyUnitsList?: ICompanyUnit[]
}

export interface ICompanyUnitInfo {
  id: string
  title: string
  description: string
  headUser: IUser
}