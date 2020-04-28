import { LeaseSummary, Lease } from '../../models/Lease'
import { PaymentFrequency } from '../../models/PaymentFrequency'
import { WeekDay } from '../../models/WeekDay'

export const MOCK_LEASE_SUMMARY: LeaseSummary[] = [
  { id: 'lease-a', tenant: 'Jack' },
  { id: 'lease-b', tenant: 'Jill' },
  { id: 'lease-c', tenant: 'John' },
  { id: 'lease-d', tenant: 'Jake' },
]

export const MOCK_API_LEASE = {
  id: 'lease-b',
  start_date: '2018-05-12',
  end_date: '2018-11-13',
  rent: 454,
  frequency: 'weekly',
  payment_day: 'tuesday',
}

export const MOCK_LEASE = Object.assign(new Lease(), {
  id: 'lease-a',
  startDate: new Date('2018-05-12'),
  endDate: new Date('2018-11-13'),
  rent: 454,
  frequency: PaymentFrequency.Weekly,
  paymentDay: WeekDay.Tuesday,
} as Lease)
