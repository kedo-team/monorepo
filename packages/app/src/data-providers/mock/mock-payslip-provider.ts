import { IPayslipViewModel } from 'src/view-model';
import { IPayslipDataProvider } from '../interfaces'
import { IDataProviderResult } from '../interfaces/common';
import { ref } from 'vue'

export class MockPayslipDataProvider implements IPayslipDataProvider {
  getPayslips(): IDataProviderResult<IPayslipViewModel[]> {
    return {
      result: ref(data),
      loading: ref(false),
      error: ref(null)
    }
  }
  
}

const data = [
  {
    'createdAt': '2022-06-15T11:31:09.347582',
    'fileId': '/sample.pdf',
    'id': '3eea28f0-8079-48b0-934e-039f861f4b08',
    'isViewed': false,
    'period': '2022-05-30'
  },
  {
    'createdAt': '2022-06-15T11:31:09.347582',
    'fileId': '/sample.pdf',
    'id': 'f1d618dc-9d52-42f1-b1a0-ebc008057bd1',
    'isViewed': false,
    'period': '2022-04-30'
  },
  {
    'createdAt': '2022-06-15T11:31:09.347582',
    'fileId': '/sample.pdf',
    'id': '21ae4e17-806d-4163-b121-9bb71058a1bb',
    'isViewed': false,
    'period': '2022-03-30'
  },
  {
    'createdAt': '2022-06-15T11:31:09.347582',
    'fileId': '/sample.pdf',
    'id': '27b905d6-d8e1-4b03-b2a7-d2424a277ead',
    'isViewed': false,
    'period': '2022-02-28'
  },
  {
    'createdAt': '2022-06-15T11:31:09.347582',
    'fileId': '/sample.pdf',
    'id': '3dc866b0-eb97-43dd-85c1-a26dd39f387a',
    'isViewed': false,
    'period': '2022-01-30'
  }
]