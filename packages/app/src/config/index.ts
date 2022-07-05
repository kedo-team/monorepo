import type { IUserTaskDataProvider,
              IUserVacationDataProvider,
              IRequestDataProvider,
              IPayslipDataProvider,
              IBuisinessTripDataProvider,
              ICompanyUnitDataProvider,
              IAuthProvider} from 'src/data-providers/interfaces'
import { KeyCloakAuthProvider } from 'src/data-providers/Keycloak-auth-provider'
import { MockVacationDataProvider,
         MockUserTaskDataProvider,
         MockRequestDataProvider,
         MockPayslipDataProvider,
         MockBuisinessTripProvider,
         MockCompanyUnitProvider,
         MockAuthProvider} from 'src/data-providers/mock'

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
              companyUnit: new MockCompanyUnitProvider(),
              auth: new MockAuthProvider()
              // auth: new KeyCloakAuthProvider({
              //   url:      import.meta.env.VITE_OIDC_URL,
              //   realm:    import.meta.env.VITE_OIDC_URL_REALM,
              //   clientId: import.meta.env.VITE_OIDC_CLIENT_ID
              // })
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
    auth: IAuthProvider
  }

  plugins: string[]
}

const cfg = Object.freeze(new AppConfig())
export default cfg