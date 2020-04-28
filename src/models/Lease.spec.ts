import { Lease } from './Lease'
import { PaymentFrequency } from './PaymentFrequency'
import { WeekDay, toNativeDay } from './WeekDay'
import { MOCK_API_LEASE, MOCK_LEASE } from '../__tests__/fixtures/leases'

describe('Model: Lease', () => {
  it('should hydrate from api response ', () => {
    const lease = Lease.fromJSON(MOCK_API_LEASE)

    expect(lease.constructor).toBe(Lease)

    expect(lease).toEqual({
      id: 'lease-b',
      startDate: new Date('2018-05-12'),
      endDate: new Date('2018-11-13'),
      rent: 454,
      frequency: PaymentFrequency.Weekly,
      paymentDay: WeekDay.Tuesday,
    })
  })

  it('should generate payment schedule', () => {
    const lease = MOCK_LEASE
    const schedule = Lease.computePaymentSchedule(lease)

    expect(Array.isArray(schedule)).toBe(true)

    expect(schedule[0].from).toBe(lease.startDate)
    expect(schedule[schedule.length - 1].to).toBe(lease.endDate)

    // expect every `from` date after the first one to be the payment day
    const day = toNativeDay(lease.paymentDay)
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].from.getDay()).toBe(day)
    }
  })
})
