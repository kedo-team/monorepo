import { IPayslipViewModel } from 'src/view-model';
import { IDataProviderResult } from './common';

export interface IPayslipDataProvider {
  getPayslips(): IDataProviderResult<IPayslipViewModel[]>
}
