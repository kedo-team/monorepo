import type { IUserTaskDataProvider, 
              IUserVacationDataProvider, 
              IRequestDataProvider, 
              IPayslipDataProvider} from 'src/data-providers/interfaces'
import { MockVacationDataProvider } from 'src/data-providers/mock/mock-vacation-provider'
import { MockUserTaskDataProvider } from 'src/data-providers/mock/mock-user-task-provider'
import { MockRequestDataProvider } from  'src/data-providers/mock/mock-request-provider'
import { MockPayslipDataProvider } from 'src/data-providers/mock/mock-payslip-provider';


// singleton
class AppConfig implements IAppConfig {
  // docs: https://www.patterns.dev/posts/singleton-pattern/
  // docs: https://refactoring.guru/design-patterns/singleton/typescript/example
  
  public providers = { 
              unitVacation: new MockVacationDataProvider(),
              userTask:    new MockUserTaskDataProvider(),
              request: new MockRequestDataProvider(),
              payslip: new MockPayslipDataProvider()
            };
}

interface IAppConfig {
  providers: {
    unitVacation: IUserVacationDataProvider
    userTask: IUserTaskDataProvider
    request: IRequestDataProvider
    payslip: IPayslipDataProvider
  }
}

const cfg = Object.freeze(new AppConfig())
export default cfg