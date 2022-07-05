export interface IFilterOption {
  label:  string,
  value: string,
  icon?:  string,
  default?: boolean
}

export interface IDateRange {
  dateFrom: string,
  dateTo: string
}

export * from './ITaskViewModel'
export * from './IUserVacationViewModel'
export * from './IRequestViewModel'
export * from './IPayslipViewModel'
