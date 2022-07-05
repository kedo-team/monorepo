import { ICompanyUnit, ICompanyUnitInfo } from '@kedo-team/data-model'

const units: ICompanyUnit[] =
[
  {
    "id": "dbacadc7-faac-4266-9950-0fbbec2363dc",
    "title": "АО \"kedo-team\"",
    "childCompanyUnitsList": [
      {
        "id": "106cd987-6901-4ccf-8fa2-640799facbd7",
        "title": "Департамент цифровых сервисов"
      },
      {
        "id": "8d353784-bb07-4ddb-87a0-ed628bea14eb",
        "title": "Департамент финансов"
      },
      {
        "id": "e2714f32-bf49-4c95-90bb-a3478b1a0693",
        "title": "Департамент маркетинга и продаж"
      }
    ]
  }
]

const unitInfo:{[key:string]: ICompanyUnitInfo} = {
  "106cd987-6901-4ccf-8fa2-640799facbd7":
    {
      "id": "106cd987-6901-4ccf-8fa2-640799facbd7",
      "title": "Департамент цифровых сервисов",
      "description": "",
      "headUser": {
        "avatarUrl": "https://cdn.quasar.dev/img/boy-avatar.png",
        "email": "anton@kedo-team.ru",
        "firstName": "Антон",
        "id": "ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47",
        "lastName": "Толкачев",
        "phone": "+7 (906) 757-78-26"
      }
    },
    "8d353784-bb07-4ddb-87a0-ed628bea14eb":
    {
      "id": "8d353784-bb07-4ddb-87a0-ed628bea14eb",
      "title": "Департамент финансов",
      "description": "",
      "headUser": {
        "avatarUrl": "https://cdn.quasar.dev/img/boy-avatar.png",
        "email": "anton@kedo-team.ru",
        "firstName": "Антон",
        "id": "ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47",
        "lastName": "Толкачев",
        "phone": "+7 (906) 757-78-26"
      }
    },
    "e2714f32-bf49-4c95-90bb-a3478b1a0693":
    {
      "id": "e2714f32-bf49-4c95-90bb-a3478b1a0693",
      "title": "Департамент маркетинга и продаж",
      "description": "",
      "headUser": {
        "avatarUrl": "https://cdn.quasar.dev/img/boy-avatar.png",
        "email": "anton@kedo-team.ru",
        "firstName": "Антон",
        "id": "ae0cdf8a-92fe-4f28-b99b-2f8e947a8b47",
        "lastName": "Толкачев",
        "phone": "+7 (906) 757-78-26"
      }
    }
}



export { units, unitInfo }
