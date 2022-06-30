import { date } from 'quasar'
import { IUserVacationDataProvider, IDataProviderResult } from 'src/data-providers/interfaces'
import { IUserVacationViewModel } from 'src/view-model'
import { ref } from 'vue'



export class MockVacationDataProvider implements IUserVacationDataProvider {
  getUnitsVacation(): IDataProviderResult<IUserVacationViewModel[]> {
    return {
      result: ref(data),
      loading: ref(false),
      error: ref(null)
    }
  }
  
}

const data: IUserVacationViewModel[] = [
  {
      email: "rhoncus.id@mail.ru",
      firstName: "Lana",
      id: "e06f94f4-81e0-4710-8e0c-0bef424d1b68",
      lastName: "Vaughan",
      phone: "+7 (949) 866-32-39",
      avatarUrl: "https://cdn.quasar.dev/img/boy-avatar.png",
      vacationsList: [
        {
          id: 'asd' ,
          createdAt: '2022-06-28',
          requestId: 'request-id',
          ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
          status: 'IN_PROGRESS',
          payload: {
            dateFrom: '2022-06-28',
            dateTo: '2022-07-07',
            isPayed: true,
          }
        },
        { 
          id: 'asd' ,
          createdAt: '2022-06-28',
          requestId: 'request-id',
          ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
          status: 'APPROVED',
          payload: {
            dateFrom: '2022-07-01',
            dateTo: '2022-07-07',
            isPayed: true,
          }
        }
      ]
  },
  {
    email: "rhoncus.id@mail.ru",
    firstName: "Антон",
    id: "e06f94f4-81e0-4710-8e0c-0bef424d1b69",
    lastName: "Толкачев",
    phone: "+7 (949) 866-32-39",
    avatarUrl: "https://cdn.quasar.dev/img/boy-avatar.png",
    vacationsList: [
      {
        id: 'asd-2' ,
        createdAt: '2022-06-29',
        requestId: 'request-id',
        ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
        status: 'IN_PROGRESS',
        payload: {
          dateFrom: '2022-06-29',
          dateTo: '2022-07-02',
          isPayed: true,
        }
      },
      { 
        id: 'asd' ,
        createdAt: '2022-06-28',
        requestId: 'request-id',
        ownerUserId: 'e06f94f4-81e0-4710-8e0c-0bef424d1b68',
        status: 'APPROVED',
        payload: {
          dateFrom: '2022-07-03',
          dateTo: '2022-07-06',
          isPayed: true,
        }
      }
    ]
  }
]
