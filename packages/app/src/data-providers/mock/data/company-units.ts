import { ICompanyUnit, ICompanyUnitInfo } from '@kedo-team/data-model'

const units: ICompanyUnit[] =
[
  {
    "id": "dbacadc7-faac-4266-9950-0fbbec2363dc",
    "title": "АО \"kedo-team\"",
    "childCompanyUnitsList": [
      {
        "id": "06792050-c1ce-4efc-9174-dd4239073dee",
        "title": "Управление бухгалтерского учета и отчетности",
        "childCompanyUnitsList": [
          {
            "id": "0ade3ea0-aa5e-447b-a8ac-996a1f6e57b9",
            "title": "Сметно-штатный отдел"
          },
          {
            "id": "6f1c6270-abc5-4260-b7af-d2e160e33584",
            "title": "Отдел расчетов по оплате труда"
          }
        ]
      },
      {
        "id": "106cd987-6901-4ccf-8fa2-640799facbd7",
        "title": "Департамент цифровых сервисов",
        "childCompanyUnitsList": []
      },
      {
        "id": "16fafc16-9d94-44b7-868c-43cfc94f57a7",
        "title": "Управление обеспечения безопасности",
        "childCompanyUnitsList": [
          {
            "id": "310976ee-c07e-496b-9139-c00063c8ed29",
            "title": "Сектор дежурной службы"
          }
        ]
      },
      {
        "id": "1f7b354f-6a76-40ca-bb1d-fb8de4d0a960",
        "title": "Управление установки и эксплуатации оборудования",
        "childCompanyUnitsList": [
          {
            "id": "3423748a-8470-4cb8-9f46-70edb85b3e91",
            "title": "Отдел установки и эксплуатации оборудования"
          },
          {
            "id": "d02da1a6-b37f-4f2b-abc7-c32ac04d1630",
            "title": "Отдел автоматизированных систем и системного ПО"
          }
        ]
      },
      {
        "id": "3deeae14-5d0c-4493-b402-4451b732ee15",
        "title": "Юридический отдел",
        "childCompanyUnitsList": []
      },
      {
        "id": "5839b521-1369-49dc-a3a4-4a3ccce165b3",
        "title": "Отдел по работе с персоналом",
        "childCompanyUnitsList": [
          {
            "id": "a9ae3fa9-3357-4217-a55e-182f2b90bbec",
            "title": "Сектор развития персонала"
          }
        ]
      },
      {
        "id": "8d353784-bb07-4ddb-87a0-ed628bea14eb",
        "title": "Департамент финансов",
        "childCompanyUnitsList": []
      },
      {
        "id": "99f3bbc2-5eef-4143-a8a9-22753017eb11",
        "title": "Хозяйственно-эксплуатационное управление",
        "childCompanyUnitsList": [
          {
            "id": "3c73c355-4271-486f-b95d-d33d72ed7c21",
            "title": "Хозяйственный отдел"
          }
        ]
      },
      {
        "id": "a0b3a349-202b-4a5a-8f4c-46e7695e19d0",
        "title": "Руководство",
        "childCompanyUnitsList": []
      },
      {
        "id": "e02bfc5e-342d-4559-845f-1970c95e5bcf",
        "title": "Управление маркетинга и обслуживания клиентов",
        "childCompanyUnitsList": []
      },
      {
        "id": "e2714f32-bf49-4c95-90bb-a3478b1a0693",
        "title": "Департамент маркетинга и продаж",
        "childCompanyUnitsList": []
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
