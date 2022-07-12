import { IPayslipDataProvider } from '../interfaces'
import data from './data/payslips'
import { reactiveFuncWrapper } from './reactive-func-wrapper';
import { reactive, watch } from 'vue'

export class MockPayslipDataProvider implements IPayslipDataProvider {
  private payslips = reactive(data)

  getPayslips = reactiveFuncWrapper(
    () => this.payslips
  )

  setViewed(id: string): Promise<void> {
    return new Promise((res, rej) => {
      const p = this.payslips.find(el => el.id === id)
      if (!p) rej('Расчетный листок не найден')
      p.isViewed = true

      res()
    })
  }
}
