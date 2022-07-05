import type { IUserTaskDataProvider,
              IUserVacationDataProvider,
              IRequestDataProvider,
              IPayslipDataProvider,
              IBuisinessTripDataProvider,
              ICompanyUnitDataProvider} from 'src/data-providers/interfaces'
import { MockVacationDataProvider,
         MockUserTaskDataProvider,
         MockRequestDataProvider,
         MockPayslipDataProvider,
         MockBuisinessTripProvider,
         MockCompanyUnitProvider } from 'src/data-providers/mock'

// singleton
class AppConfig implements IAppConfig {
  // docs: https://www.patterns.dev/posts/singleton-pattern/
  // docs: https://refactoring.guru/design-patterns/singleton/typescript/example

  public providers = {
              unitVacation: new MockVacationDataProvider(),
              userTask:    new MockUserTaskDataProvider(),
              request: new MockRequestDataProvider(),
              payslip: new MockPayslipDataProvider(),
              buisinessTrip: new MockBuisinessTripProvider(),
              companyUnit: new MockCompanyUnitProvider()
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
    companyUnit: ICompanyUnitDataProvider
  }

  plugins: string[]
}

const cfg = Object.freeze(new AppConfig())
export default cfg