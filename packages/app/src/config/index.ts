import type { IUserTaskDataProvider,
              IUserVacationDataProvider,
              IRequestDataProvider,
              IPayslipDataProvider,
              IBuisinessTripDataProvider} from 'src/data-providers/interfaces'
import { MockVacationDataProvider,
         MockUserTaskDataProvider,
         MockRequestDataProvider,
         MockPayslipDataProvider,
         MockBuisinessTripProvider } from 'src/data-providers/mock'



// singleton
class AppConfig implements IAppConfig {
  // docs: https://www.patterns.dev/posts/singleton-pattern/
  // docs: https://refactoring.guru/design-patterns/singleton/typescript/example

  public providers = {
              unitVacation: new MockVacationDataProvider(),
              userTask:    new MockUserTaskDataProvider(),
              request: new MockRequestDataProvider(),
              payslip: new MockPayslipDataProvider(),
              buisinessTrip: new MockBuisinessTripProvider()
            }
  public plugins = [
    './CorePlugin/',
    './PayslipsPlugin/',
    './RequestForVacationPlugin/',
    './CertificatesPlugin/',
    './LnaPlugin/',
    './CompanyStructurePlugin/',
    './ApprovementEditorPlugin/',
    './BuisinessTripPlugin/'
   ]
}

interface IAppConfig {
  providers: {
    unitVacation: IUserVacationDataProvider
    userTask: IUserTaskDataProvider
    request: IRequestDataProvider
    payslip: IPayslipDataProvider
    buisinessTrip: IBuisinessTripDataProvider
  }

  plugins: string[]
}

const cfg = Object.freeze(new AppConfig())
export default cfg