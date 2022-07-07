import { ref } from 'vue'
import { ITaskViewModel } from 'src/view-model';
import { IUserTaskDataProvider } from 'src/data-providers/interfaces'
import { IDataProviderResult } from '../interfaces/common';
import data from './data/tasks'
export class MockUserTaskDataProvider implements IUserTaskDataProvider {
  getUserTasks(): IDataProviderResult<ITaskViewModel[]> {
    return {
      result: ref(data),
      loading: ref(false),
      error: ref(null)
    }
  }
}
