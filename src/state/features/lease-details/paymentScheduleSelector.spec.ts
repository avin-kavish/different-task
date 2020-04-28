import { paymentScheduleSelector } from './paymentScheduleSelector'
import { MOCK_LEASE } from '../../../__tests__/fixtures/leases'
import { Payment } from '../../../models/Payment'
import { RootState } from '../../store'

describe('paymentScheduleSelector', () => {
  it('should select the payment schedule given a lease', () => {
    const payments = paymentScheduleSelector.resultFunc(MOCK_LEASE)
    expectPayments(payments)
  })

  it('should return `null` given nothing', () => {
    const payments = paymentScheduleSelector.resultFunc(undefined)

    expect(payments).toBe(null)
  })

  it('should select the payment schedule give the relevant root state', () => {
    const rootState: Partial<RootState> = {
      leaseDetails: { lease: MOCK_LEASE, loadError: null },
    }

    const payments = paymentScheduleSelector(rootState as any)
    expectPayments(payments)
  })
})

function expectPayments(payments: any) {
  // Quick and Dirty check for payment objects in the array. The accuracy of the
  // computation is tested in models/Lease.spec.ts
  const payment: Payment = { from: null, to: null, days: null, amount: null }
  const keys = Object.keys(payment)
  for (const payment of payments) {
    for (const key of keys) {
      expect(payment).toHaveProperty(key)
    }
  }
}
