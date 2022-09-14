import { IUserVacationViewModel } from 'src/view-model'
import { date } from 'quasar'
import * as users from './users'

const user1Vacations: IUserVacationViewModel = {
  ...users.user1,
  vacationsList:  [
    {
      id: users.user1.firstName + Math.random() ,
      createdAt: new Date().toISOString(),
      requestId: 'request-id',
      ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
      status: 'IN_PROGRESS',
      payload: {
        dateFrom: date.addToDate(new Date(), { days: -7 }).toISOString(),
        dateTo: date.addToDate(new Date(), {days: 7}).toISOString(),
        isPayed: true,
      }
    },
    {
      id: users.user1.firstName + Math.random(),
      createdAt: '2022-06-28',
      requestId: 'request-id',
      ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
      status: 'APPROVED',
      payload: {
        dateFrom: '2022-09-01',
        dateTo: '2022-09-13',
        isPayed: true,
      }
    }
  ]
}

const user2Vacations: IUserVacationViewModel = {
  ...users.user2,
  vacationsList: [
    {
      id: users.user2.firstName + Math.random(),
      createdAt: '2022-06-28',
      requestId: 'request-id',
      ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
      status: 'IN_PROGRESS',
      payload: {
        dateFrom: '2022-09-08',
        dateTo: '2022-09-09',
        isPayed: true,
      }
    },
    {
      id: users.user2.firstName + Math.random(),
      createdAt: '2022-06-28',
      requestId: 'request-id',
      ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
      status: 'APPROVED',
      payload: {
        dateFrom: '2022-09-12',
        dateTo: '2022-09-16',
        isPayed: true,
      }
    }
  ]
}

export const data: IUserVacationViewModel[] = [
  user1Vacations,
  user2Vacations,
]
